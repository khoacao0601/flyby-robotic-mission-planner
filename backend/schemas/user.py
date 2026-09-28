# Copyright (c) 2026 Khoa Cao. All rights reserved.

from datetime import datetime
from pydantic import BaseModel

# Data from user to Login
class UserLogin(BaseModel):
    email: str
    password: str

# Return user info
class UserResponse(BaseModel):
    id: int
    email: str
    role: str
    created_at: datetime

    # let Pydantic read data from SQLAlchemy Model
    model_config = {"from_attributes": True}

# Return data after login successfully
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse
