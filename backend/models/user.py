# Copyright (c) 2026 Khoa Cao. All rights reserved.

from sqlalchemy import Column, DateTime, Integer, String, func
from app.core.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, default="PILOT")
    created_at = Column(DateTime, default=func.now())