from fastapi import APIRouter
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.models.prompt import Prompt
from app.models.version import Version
from app.models.user import User

router = APIRouter(
    prefix="/api",
    tags=["Dashboard"]
)


@router.get("/dashboard")
def dashboard():

    db: Session = SessionLocal()

    total_prompts = db.query(Prompt).count()

    total_versions = db.query(Version).count()

    total_users = db.query(User).count()

    prompts = db.query(Prompt).all()

    average_score = 0

    if prompts:
        average_score = round(
            sum(p.qualityScore for p in prompts) / len(prompts),
            2,
        )

    recent = (
        db.query(Prompt)
        .order_by(Prompt.id.desc())
        .limit(5)
        .all()
    )

    db.close()

    return {
        "totalPrompts": total_prompts,
        "averageScore": average_score,
        "totalVersions": total_versions,
        "totalUsers": total_users,
        "recentPrompts": recent,
    }