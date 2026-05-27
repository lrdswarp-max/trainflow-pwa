import os
from pydantic import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "TrainFlow"
    API_V1_STR: str = "/api/v1"

    # In a real app, these would come from env vars
    SECRET_KEY: str = os.getenv("SECRET_KEY", "development-secret-key-change-this-in-production")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8  # 8 days

    class Config:
        case_sensitive = True
settings = Settings()
