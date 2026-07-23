
from fastapi import APIRouter
from pydantic import BaseModel

from app.services.optimizer import optimize_prompt

router = APIRouter(
    prefix="/api/optimizer",
    tags=["Prompt Optimizer"]
)


class OptimizeRequest(BaseModel):
    prompt: str


@router.post("/")
def optimize(data: OptimizeRequest):

    return optimize_prompt(data.prompt)