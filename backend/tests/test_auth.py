import pytest
import httpx
from app.main import app

@pytest.mark.asyncio
async def test_request_magic_link_success():
    async with httpx.AsyncClient(transport=httpx.ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.post("/api/v1/auth/magic-link", json={"email": "student@example.com"})
    
    assert response.status_code == 202
    assert response.json() == {"msg": "Magic link sent"}

@pytest.mark.asyncio
async def test_request_magic_link_invalid_email():
    async with httpx.AsyncClient(transport=httpx.ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.post("/api/v1/auth/magic-link", json={"email": "not-an-email"})
    
    assert response.status_code == 422
