from fastapi import APIRouter

router = APIRouter(
    prefix="/api",
    tags=["Settings"]
)

settings = {
    "theme": "light",
    "language": "English",
    "notifications": True
}


@router.get("/settings")
def get_settings():
    return settings


@router.post("/settings")
def save_settings(data: dict):
    global settings
    settings = data
    return {
        "message": "Settings updated successfully",
        "settings": settings
    }