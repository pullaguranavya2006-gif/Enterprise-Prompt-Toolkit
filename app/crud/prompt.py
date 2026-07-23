from sqlalchemy.orm import Session

from app.models.prompt import Prompt


def create_prompt(db: Session, data):
    prompt = Prompt(**data.dict())

    db.add(prompt)

    db.commit()

    db.refresh(prompt)

    return prompt


def get_prompts(db: Session):
    return db.query(Prompt).all()


def delete_prompt(db: Session, prompt_id: int):
    prompt = db.query(Prompt).filter(
        Prompt.id == prompt_id
    ).first()

    if prompt:
        db.delete(prompt)
        db.commit()

    return prompt