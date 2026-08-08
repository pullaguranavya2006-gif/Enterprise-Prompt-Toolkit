from fastapi import APIRouter, Depends, HTTPException
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


# --------------------------------------------------
# Database Dependency
# --------------------------------------------------

def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


# --------------------------------------------------
# Create Prompt
# --------------------------------------------------

@router.post(
    "/",
    response_model=PromptResponse,
)
def add_prompt(
    prompt: PromptCreate,
    db: Session = Depends(get_db),
):
    try:
        return create_prompt(db, prompt)

    except Exception as e:
        db.rollback()

        print("ERROR CREATING PROMPT:", str(e))

        raise HTTPException(
            status_code=500,
            detail=f"Failed to save prompt: {str(e)}"
        )


# --------------------------------------------------
# Get All Prompts
# --------------------------------------------------

@router.get(
    "/",
    response_model=list[PromptResponse],
)
def all_prompts(
    db: Session = Depends(get_db),
):
    return get_prompts(db)


# --------------------------------------------------
# Delete Prompt
# --------------------------------------------------

@router.delete(
    "/{prompt_id}"
)
def remove_prompt(
    prompt_id: int,
    db: Session = Depends(get_db),
):
    try:
        delete_prompt(db, prompt_id)

        return {
            "message": "Prompt Deleted Successfully"
        }

    except Exception as e:
        db.rollback()

        print("ERROR DELETING PROMPT:", str(e))

        raise HTTPException(
            status_code=500,
            detail=f"Failed to delete prompt: {str(e)}"
        )