# Copyright (c) 2026 Khoa Cao. All rights reserved.

from sqlalchemy import Column, DateTime, Float, ForeignKey, Integer, String, func
from sqlalchemy.dialects.postgresql import JSONB

from app.core.database import Base

class Mission(Base):
    __tablename__ = "missions"

    id = Column(Integer, primary_key=True, index=True)
    name= Column(String, nullable=False)
    description = Column(String, nullable=True)
    status = Column(String, default="DRAFT")

    # Flight index
    horizontal_speed = Column(Float, default=10.0)
    altitude_mode = Column(String, default="ASL")
    flight_altitude = Column(Float, default=50.0)

    # Waypoints list in JSONB
    waypoints = Column(JSONB, default=list)

    # Connection to table Users
    created_by_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    assigned_to_id = Column(Integer, ForeignKey("users.id"), nullable=True)

    created_at = Column(DateTime, default=func.now())