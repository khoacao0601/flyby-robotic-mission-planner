# Copyright (c) 2026 Khoa Cao. All rights reserved.

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from core.security import create_access_token, validation_password
from crud.crud_user import get_user_by_email
from schemas.user import Token, UserLogin

def authenticate_user(db: Session, credentials: UserLogin) -> Token:
    # Get User Info
    userDataFromDB = get_user_by_email(db, email=credentials.email)

    # Handle exceptions
    if not userDataFromDB or not validation_password(credentials.password, str(userDataFromDB.hashed_password)):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect Email or Password!"
        )

    # Return JWT
    access_token = create_access_token(
        data={"sub": userDataFromDB.email, "role": userDataFromDB.role, "id": userDataFromDB.id}
    )

    return Token(access_token=access_token, token_type="bearer")