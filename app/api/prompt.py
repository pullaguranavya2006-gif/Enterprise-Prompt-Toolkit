from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import SessionLocal

from app.schemas.prompt import (
    PromptCreate,
    PromptResponse,
)

from app.crud.prompt import (
    create_prompt,
    get_prompts,
    delete_prompt,
)

router = APIRouter(
    prefix="/prompts",
    tags=["Prompts"],
)


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


@router.post(
    "/",
    response_model=PromptResponse,
)
def add_prompt(
    prompt: PromptCreate,
    db: Session = Depends(get_db),
):
    return create_prompt(db, prompt)


@router.get(
    "/",
    response_model=list[PromptResponse],
)
def all_prompts(
    db: Session = Depends(get_db),
):
    return get_prompts(db)


@router.delete("/{prompt_id}")
def remove_prompt(
    prompt_id: int,
    db: Session = Depends(get_db),
):
    delete_prompt(db, prompt_id)

    return {
        "message": "Prompt Deleted Successfully"
    }