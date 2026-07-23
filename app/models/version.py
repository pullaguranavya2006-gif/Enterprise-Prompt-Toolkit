from sqlalchemy import Column, Integer, String, ForeignKey

from app.core.database import Base


class Version(Base):

    __tablename__ = "versions"

    id = Column(Integer, primary_key=True, index=True)

    prompt_id = Column(
        Integer,
        ForeignKey("prompts.id")
    )

    version_number = Column(Integer)

    prompt = Column(String)

    createdAt = Column(String)