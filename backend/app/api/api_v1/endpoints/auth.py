from fastapi import APIRouter, status, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from app.schemas.auth import MagicLinkRequest, TokenVerifyRequest, Token, User
from app.services.auth import create_magic_link_token, get_email_from_token, revoke_token, get_user_by_email
from app.core.security import create_access_token, decode_access_token
import jwt

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"/api/v1/auth/verify")

@router.post("/magic-link", status_code=status.HTTP_202_ACCEPTED)
async def request_magic_link(payload: MagicLinkRequest):
    # In a real app, we might check if user exists or create them
    token = create_magic_link_token(payload.email)
    
    # Mock sending email
    # In a real app, this would be an async task
    print(f"DEBUG: Sending magic link to {payload.email}: http://localhost:3000/login?token={token}")
    
    return {"msg": "Magic link sent"}

@router.post("/verify", response_model=Token)
async def verify_magic_link(payload: TokenVerifyRequest):
    email = get_email_from_token(payload.token)
    if not email:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired magic link token",
        )
    
    # Revoke token after use
    revoke_token(payload.token)
    
    access_token = create_access_token(subject=email)
    return {"access_token": access_token, "token_type": "bearer"}

async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = decode_access_token(token)
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
            )
    except jwt.PyJWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
        )
    
    user_data = get_user_by_email(email)
    if not user_data:
        # Default for new users during testing
        return User(email=email, role="student")
    
    return User(email=email, role=user_data["role"])

@router.get("/me", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user
