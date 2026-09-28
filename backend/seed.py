# Copyright (c) 2026 Khoa Cao. All rights reserved.

from core.database import Base, SessionLocal, engine
from core.security import hash_pass
from models.user import User
from models.mission import Mission

def seed_data():

    # Force to create 2 table Users and Missions
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    test_users = [
        {"email": "admin@flyby.com", "password": "admin123", "role": "ADMIN"},
        {"email": "pilot1@flyby.com", "password": "pilot123", "role": "PILOT"},
        {"email": "pilot2@flyby.com", "password": "pilot123", "role": "PILOT"},
    ]

    try:
        for u in test_users:
            existing_user = db.query(User).filter(User.email == u["email"]).first()
            if not existing_user:
                new_user = User(
                    email=u["email"],
                    hashed_password=hash_pass(u["password"]),
                    role=u["role"],
                )
                db.add(new_user)
                print(f"Created {u['role']}: {u['email']} / {u['password']}")
            else:
                print(f"User {u['email']} already exists!")
        db.commit()
        print("-> Seeding completed successfully!")
    finally:
        db.close()
        
if __name__ == "__main__":
    seed_data()