from sqlalchemy import Column, Integer, String, Text

from app.core.database import Base


class Prompt(Base):
    __tablename__ = "prompts"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String, nullable=False)

    category = Column(String)

    prompt = Column(Text)

    qualityScore = Column(Integer)

    createdAt = Column(String)