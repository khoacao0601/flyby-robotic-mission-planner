# Copyright (c) 2026 Khoa Cao. All rights reserved.

from datetime import datetime
from pydantic import BaseModel

# Data for new Mission
class MissionCreate(BaseModel):
    name: str
    description: str = None
    horizontal_speed: float = 10.0
    altitude_mode: str = "ASL"
    flight_altitude: float = 50.0
    waypoints: list = []
    assigned_to_id: int = None


# Return Data for Web
class MissionResponse(BaseModel):
    id: int
    name: str
    description: str = None
    status: str
    horizontal_speed: float
    altitude_mode: str
    flight_altitude: float
    waypoints: list
    created_by_id: int
    assigned_to_id: int = None
    created_at: datetime

    # let Pydantic read data from SQLAlchemy Model
    model_config = {"from_attributes": True}