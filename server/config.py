import os
from dotenv import load_dotenv
import redis

load_dotenv()

class Config:
    SECRET_KEY =  "10127b7e6ad8d8f492ed74f2" 

    # Database Configuration
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URI", "sqlite:///./db.sqlite")  # Use os.environ.get to provide a default value
    DEBUG = True
    WTF_CSRF_ENABLED = False

    # Session Management with Redis
    SESSION_TYPE = "redis"
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True
    SESSION_KEY_PREFIX = '10127b7e6ad8d8f492ed74f2' 
    SESSION_REDIS = redis.StrictRedis.from_url(os.environ.get("REDIS_URL", "redis://127.0.0.1:6379"))  # Use os.environ.get with a default value

