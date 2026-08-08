from sqlalchemy import Column, Integer, String, Text

from app.core.database import Base


class Prompt(Base):
    __tablename__ = "prompts"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    title = Column(
        String,
        nullable=False
    )

    category = Column(
        String,
        nullable=False,
        default="General"
    )

    prompt = Column(
        Text,
        nullable=False
    )

    qualityScore = Column(
        Integer,
        default=0,
        nullable=False
    )