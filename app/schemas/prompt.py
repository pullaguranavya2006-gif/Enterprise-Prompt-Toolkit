from pydantic import BaseModel


class PromptCreate(BaseModel):
    title: str
    category: str = "General"
    prompt: str
    qualityScore: int = 0


class PromptResponse(BaseModel):
    id: int
    title: str
    category: str
    prompt: str
    qualityScore: int

    class Config:
        from_attributes = True