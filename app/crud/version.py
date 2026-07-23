from sqlalchemy.orm import Session
from app.models.version import Version
from app.schemas.version import VersionCreate


def create_version(db: Session, version: VersionCreate):
    new_version = Version(
        promptTitle=version.promptTitle,
        version=version.version,
        prompt=version.prompt,
        createdAt=version.createdAt,
    )

    db.add(new_version)
    db.commit()
    db.refresh(new_version)

    return new_version


def get_versions(db: Session):
    return db.query(Version).all()


def get_version(db: Session, version_id: int):
    return db.query(Version).filter(Version.id == version_id).first()


def delete_version(db: Session, version_id: int):
    version = db.query(Version).filter(Version.id == version_id).first()

    if version:
        db.delete(version)
        db.commit()

    return version