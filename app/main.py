from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.database import Base, engine

# Import Models
from app.models.user import User
from app.models.prompt import Prompt
from app.models.version import Version

# Import Routers
from app.api.user import router as user_router
from app.api.prompt import router as prompt_router
from app.api.version import router as version_router
from app.api.optimizer import router as optimizer_router
from app.api.evaluator import router as evaluator_router
from app.api.model_comparison import router as model_router
from app.api.auth import router as auth_router
from app.api.export import router as export_router
from app.api.analytics import router as analytics_router
from app.api.settings import router as settings_router
from app.api.dashboard import router as dashboard_router

# Create Database Tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Enterprise Prompt Engineering Toolkit API",
    version="1.0.0",
    description="Backend API for Enterprise Prompt Engineering Toolkit"
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Routers
app.include_router(auth_router)
app.include_router(user_router)
app.include_router(prompt_router)
app.include_router(version_router)
app.include_router(optimizer_router)
app.include_router(evaluator_router)
app.include_router(model_router)
app.include_router(export_router)
app.include_router(analytics_router)
app.include_router(settings_router)
app.include_router(dashboard_router)


@app.get("/")
def home():
    return {
        "status": "Backend Running Successfully",
        "version": "1.0",
        "database": "SQLite Connected",
        "project": "Enterprise Prompt Engineering Toolkit"
    }


@app.get("/health")
def health():
    return {
        "status": "Healthy",
        "message": "API is running successfully."
    }