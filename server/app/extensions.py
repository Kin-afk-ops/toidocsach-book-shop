from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv

import redis
import os

db = SQLAlchemy()
load_dotenv()

redis_url = os.getenv("REDIS_URL")

if not redis_url:
    raise ValueError("❌ REDIS_URL chưa được cấu hình trong .env")

redis_client = redis.StrictRedis.from_url(redis_url, decode_responses=True)