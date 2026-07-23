from pydantic import BaseModel
from typing import Optional


class PromptCreate(BaseModel):
    title: str
    category: str
    prompt: str
    qualityScore: int
    createdAt: str


class PromptUpdate(BaseModel):
    title: Optional[str] = None
    category: Optional[str] = None
    prompt: Optional[str] = None
    qualityScore: Optional[int] = None
    createdAt: Optional[str] = None


class PromptResponse(BaseModel):
    id: int
    title: str
    category: str
    prompt: str
    qualityScore: int
    createdAt: str

    class Config:
        from_attributes = True