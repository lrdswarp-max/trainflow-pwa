from fastapi import APIRouter, status
from app.schemas.auth import MagicLinkRequest
from app.services.auth import create_magic_link_token

router = APIRouter()

@router.post("/magic-link", status_code=status.HTTP_202_ACCEPTED)
async def request_magic_link(payload: MagicLinkRequest):
    token = create_magic_link_token(payload.email)
    
    # Mock sending email
    # In a real app, this would be an async task
    print(f"DEBUG: Sending magic link to {payload.email}: http://localhost:3000/login?token={token}")
    
    return {"msg": "Magic link sent"}
