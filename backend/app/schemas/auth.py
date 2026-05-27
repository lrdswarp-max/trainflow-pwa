from pydantic import BaseModel, EmailStr

class MagicLinkRequest(BaseModel):
    email: EmailStr

class TokenVerifyRequest(BaseModel):
    token: str

class Token(BaseModel):
    access_token: str
    token_type: str

class UserBase(BaseModel):
    email: str
    role: str | None = None

class User(UserBase):
    id: int | None = None
