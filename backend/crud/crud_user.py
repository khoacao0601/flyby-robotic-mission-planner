# Copyright (c) 2026 Khoa Cao. All rights reserved.

from sqlalchemy.orm import Session
from models.user import User

# Function to get User by Email
def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()