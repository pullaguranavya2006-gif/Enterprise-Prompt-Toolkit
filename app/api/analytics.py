from fastapi import APIRouter
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.models.prompt import Prompt

router = APIRouter(
    prefix="/api/analytics",
    tags=["Analytics"]
)


@router.get("")
def analytics():

    db: Session = SessionLocal()

    prompts = db.query(Prompt).all()

    total = len(prompts)

    average = 0

    if total > 0:
        average = sum(
            p.qualityScore for p in prompts
        ) / total

    return {
        "totalPrompts": total,
        "averageScore": round(average,2),
        "highestScore": max(
            [p.qualityScore for p in prompts],
            default=0
        ),
        "lowestScore": min(
            [p.qualityScore for p in prompts],
            default=0
        )
    }