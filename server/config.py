import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY =  "10127b7e6ad8d8f492ed74f2" 

    # Database Configuration
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URI", "sqlite:///./db.sqlite")  # Use os.environ.get to provide a default value
    DEBUG = True
    WTF_CSRF_ENABLED = False
