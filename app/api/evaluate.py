from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(
    prefix="/api/evaluate",
    tags=["Prompt Evaluation"]
)


class EvaluateRequest(BaseModel):
    prompt: str


@router.post("/")
def evaluate_prompt(data: EvaluateRequest):

    prompt = data.prompt

    score = 10

    suggestions = []

    weaknesses = []

    if len(prompt) < 100:
        score -= 2
        weaknesses.append("Prompt is too short")
        suggestions.append("Provide more context")

    if "role" not in prompt.lower():
        score -= 1
        weaknesses.append("Missing Persona")
        suggestions.append("Define an AI role")

    if "task" not in prompt.lower():
        score -= 1
        weaknesses.append("Missing Task")
        suggestions.append("Clearly define the task")

    if score < 0:
        score = 0

    return {
        "quality_score": score,
        "weaknesses": weaknesses,
        "suggestions": suggestions
    }