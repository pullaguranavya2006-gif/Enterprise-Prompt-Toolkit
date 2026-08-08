from sqlalchemy.orm import Session

from app.models.prompt import Prompt
from app.schemas.prompt import PromptCreate


def create_prompt(
    db: Session,
    prompt_data: PromptCreate
):
    new_prompt = Prompt(
        title=prompt_data.title,
        category=prompt_data.category,
        prompt=prompt_data.prompt,
        qualityScore=prompt_data.qualityScore,
    )

    db.add(new_prompt)
    db.commit()
    db.refresh(new_prompt)

    return new_prompt


def get_prompts(db: Session):
    return (
        db.query(Prompt)
        .order_by(Prompt.id.desc())
        .all()
    )


def delete_prompt(
    db: Session,
    prompt_id: int
):
    prompt = (
        db.query(Prompt)
        .filter(Prompt.id == prompt_id)
        .first()
    )

    if prompt:
        db.delete(prompt)
        db.commit()

    return prompt