from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(
    prefix="/api/models",
    tags=["Model Comparison"]
)


class CompareRequest(BaseModel):
    prompt: str


@router.post("/")
def compare_models(data: CompareRequest):

    prompt = data.prompt

    return {
        "models": [
            {
                "name": "GPT-4",
                "quality": 9.8,
                "speed": "Fast",
                "response": f"GPT-4 Response:\n\n{prompt}"
            },
            {
                "name": "Claude 3",
                "quality": 9.6,
                "speed": "Medium",
                "response": f"Claude Response:\n\n{prompt}"
            },
            {
                "name": "Gemini",
                "quality": 9.4,
                "speed": "Fast",
                "response": f"Gemini Response:\n\n{prompt}"
            }
        ],
        "winner": "GPT-4"
    }