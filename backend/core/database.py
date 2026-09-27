# Copyright (c) 2026 Khoa Cao. All rights reserved.

from sqlalchemy import create_engine
from core.config import DATABASE_URL

from sqlalchemy.orm import sessionmaker, DeclarativeBase

#Connection Pool use credential from DATABASE_URL
engine = create_engine(DATABASE_URL, pool_pre_ping=True)

#Create SessionLocal
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

#database models that inheritage Base class
class Base(DeclarativeBase):
    pass

#get DB session per request
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
