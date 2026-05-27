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

@pytest.mark.asyncio
async def test_verify_magic_link_success():
    email = "student@example.com"
    # First get a link
    async with httpx.AsyncClient(transport=httpx.ASGITransport(app=app), base_url="http://test") as ac:
        await ac.post("/api/v1/auth/magic-link", json={"email": email})
        
        # We need to "steal" the token from the mock service for testing
        from app.services.auth import _temp_tokens
        token = list(_temp_tokens.keys())[0]
        
        # Verify it
        response = await ac.post("/api/v1/auth/verify", json={"token": token})
        assert response.status_code == 200
        data = response.json()
        assert "access_token" in data
        assert data["token_type"] == "bearer"
        
        # Use JWT to get /me
        access_token = data["access_token"]
        headers = {"Authorization": f"Bearer {access_token}"}
        response = await ac.get("/api/v1/auth/me", headers=headers)
        assert response.status_code == 200
        assert response.json()["email"] == email
        assert response.json()["role"] == "student"

@pytest.mark.asyncio
async def test_verify_magic_link_trainer():
    email = "trainer@example.com"
    async with httpx.AsyncClient(transport=httpx.ASGITransport(app=app), base_url="http://test") as ac:
        await ac.post("/api/v1/auth/magic-link", json={"email": email})
        
        from app.services.auth import _temp_tokens
        token = [k for k, v in _temp_tokens.items() if v == email][0]
        
        response = await ac.post("/api/v1/auth/verify", json={"token": token})
        access_token = response.json()["access_token"]
        
        headers = {"Authorization": f"Bearer {access_token}"}
        response = await ac.get("/api/v1/auth/me", headers=headers)
        assert response.status_code == 200
        assert response.json()["email"] == email
        assert response.json()["role"] == "trainer"

@pytest.mark.asyncio
async def test_verify_magic_link_invalid():
    async with httpx.AsyncClient(transport=httpx.ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.post("/api/v1/auth/verify", json={"token": "invalid-token"})
        assert response.status_code == 401
