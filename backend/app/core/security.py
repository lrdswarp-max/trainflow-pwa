import secrets

def generate_magic_token() -> str:
    return secrets.token_urlsafe(32)
