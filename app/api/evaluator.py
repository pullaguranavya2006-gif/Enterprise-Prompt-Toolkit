from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(
    prefix="/api/evaluator",
    tags=["Prompt Evaluator"]
)


class EvaluateRequest(BaseModel):
    prompt: str


@router.post("/")
def evaluate_prompt(data: EvaluateRequest):

    prompt = data.prompt.lower()

    score = 5

    strengths = []
    weaknesses = []
    suggestions = []

    if "context" in prompt:
        score += 1
        strengths.append("Good context provided")
    else:
        weaknesses.append("Missing context")
        suggestions.append("Add more context")

    if "task" in prompt:
        score += 1
        strengths.append("Task clearly defined")
    else:
        weaknesses.append("Task not clear")
        suggestions.append("Explain the task")

    if "output" in prompt:
        score += 1
        strengths.append("Output format specified")
    else:
        weaknesses.append("No output format")
        suggestions.append("Specify output format")

    if "constraint" in prompt:
        score += 1
        strengths.append("Constraints defined")
    else:
        weaknesses.append("No constraints")
        suggestions.append("Add constraints")

    if len(prompt) > 250:
        score += 1
        strengths.append("Detailed prompt")
    else:
        weaknesses.append("Prompt is short")
        suggestions.append("Provide more details")

    return {
        "quality_score": score,
        "strengths": strengths,
        "weaknesses": weaknesses,
        "suggestions": suggestions
    }