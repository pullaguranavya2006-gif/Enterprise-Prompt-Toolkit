from pydantic import BaseModel


class VersionCreate(BaseModel):
    prompt_id: int
    version_number: int
    prompt: str
    createdAt: str


class VersionResponse(VersionCreate):
    id: int

    class Config:
        from_attributes = True