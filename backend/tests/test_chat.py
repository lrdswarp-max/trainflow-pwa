import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_websocket_chat():
    with client.websocket_connect("/api/v1/chat/ws/user1") as websocket1:
        with client.websocket_connect("/api/v1/chat/ws/user2") as websocket2:
            websocket1.send_json({"receiverId": "user2", "content": "Hello from user1"})
            
            data = websocket2.receive_json()
            assert data["senderId"] == "user1"
            assert data["content"] == "Hello from user1"
