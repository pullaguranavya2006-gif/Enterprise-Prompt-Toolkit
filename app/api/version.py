from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.models.version import Version
from app.schemas.version import VersionCreate

router = APIRouter(
    prefix="/api/versions",
    tags=["Versions"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/")
def get_versions(db: Session = Depends(get_db)):
    return db.query(Version).order_by(
        Version.id.desc()
    ).all()


@router.post("/")
def create_version(
    version: VersionCreate,
    db: Session = Depends(get_db),
):
    db_version = Version(
        prompt_id=version.prompt_id,
        version_number=version.version_number,
        prompt=version.prompt,
        createdAt=version.createdAt,
    )

    db.add(db_version)

    db.commit()

    db.refresh(db_version)

    return db_version