from fastapi import APIRouter
from pydantic import BaseModel

from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
)

router = APIRouter(
    prefix="/api/auth",
    tags=["Authentication"],
)

users = []


class RegisterUser(BaseModel):
    username: str
    email: str
    password: str


class LoginUser(BaseModel):
    email: str
    password: str


@router.post("/register")
def register(user: RegisterUser):

    hashed = hash_password(user.password)

    users.append(
        {
            "username": user.username,
            "email": user.email,
            "password": hashed,
        }
    )

    return {
        "message": "Registration Successful"
    }


@router.post("/login")
def login(user: LoginUser):

    for db_user in users:

        if db_user["email"] == user.email:

            if verify_password(
                user.password,
                db_user["password"],
            ):

                token = create_access_token(
                    {
                        "sub": db_user["email"]
                    }
                )

                return {
                    "access_token": token,
                    "token_type": "bearer",
                }

    return {
        "message": "Invalid Credentials"
    }