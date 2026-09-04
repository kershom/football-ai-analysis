from fastapi import FastAPI

from .database import engine, Base
from . import models
from .routes import players


Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="Football AI Analysis API",
    description="Backend API for AI-powered football player tracking and performance analysis.",
    version="0.2.0",
)


app.include_router(players.router)


@app.get("/")
def root():
    return {
        "message": "Football AI Analysis API",
        "status": "running",
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
    }
