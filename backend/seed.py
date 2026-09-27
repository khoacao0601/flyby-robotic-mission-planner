# Copyright (c) 2026 Khoa Cao. All rights reserved.

from core.database import SessionLocal
from core.security import hash_pass
from models.user import User

def seed_data():
    db = SessionLocal()
    try:
        # Create test Admin account
        admin = db.query(User).filter(User.email == "admin@flyby.com").first()
        if not admin:
            admin_user = User(
                email='admin@flyby.com',
                hashed_password=hash_pass("admin123"),
                role="ADMIN",
            )
            db.add(admin_user)
            print("Created Admin: admin@flyby.com / admin123")
        else:
            print("Admin already exists!")

        # Create test PILOT account
        pilot = db.query(User).filter(User.email == "pilot@flyby.com").first()
        if not pilot:
            pilot_user = User(
                email="pilot@flyby.com",
                hashed_password=hash_pass("pilot123"),
                role="PILOT"
            )
            db.add(pilot_user)
            print("Created Pilot: pilot@flyby.com / pilot123")
        else:
            print("Pilot already exists!")

        # Save change to DB
        db.commit()
        print("Test Account was added successfully!")

    finally:
        db.close()

if __name__ == "__main__":
    seed_data()