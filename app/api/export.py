from fastapi import APIRouter
from fastapi.responses import FileResponse

from app.services.export_service import (
    export_pdf,
    export_docx,
    export_json,
)

router = APIRouter(
    prefix="/api/export",
    tags=["Export"],
)


sample_prompt = """
Persona:
AI Interview Coach

Context:
Preparing students.

Task:
Create interview questions.

Constraints:
Professional.

Output:
Table Format.
"""


@router.get("/pdf")
def download_pdf():

    filename = "prompt.pdf"

    export_pdf(
        sample_prompt,
        filename,
    )

    return FileResponse(
        filename,
        media_type="application/pdf",
        filename=filename,
    )


@router.get("/docx")
def download_docx():

    filename = "prompt.docx"

    export_docx(
        sample_prompt,
        filename,
    )

    return FileResponse(
        filename,
        media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        filename=filename,
    )


@router.get("/json")
def download_json():

    filename = "prompt.json"

    export_json(
        {
            "prompt": sample_prompt
        },
        filename,
    )

    return FileResponse(
        filename,
        media_type="application/json",
        filename=filename,
    )