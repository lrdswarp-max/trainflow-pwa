from app.services.auth import create_magic_link_token, get_email_from_token, revoke_token

def test_magic_link_flow():
    email = "test@example.com"
    token = create_magic_link_token(email)
    
    assert token is not None
    assert get_email_from_token(token) == email
    
    revoke_token(token)
    assert get_email_from_token(token) is None
