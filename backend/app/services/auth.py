from app.core.security import generate_magic_token

# In-memory store for tokens (temporary until DB is set up)
_temp_tokens = {}

def create_magic_link_token(email: str) -> str:
    token = generate_magic_token()
    _temp_tokens[token] = email
    return token

def get_email_from_token(token: str) -> str | None:
    return _temp_tokens.get(token)

def revoke_token(token: str):
    if token in _temp_tokens:
        del _temp_tokens[token]
