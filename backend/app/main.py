from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import engine, Base
from . import models
from .routes import players, teams


# Create database tables
Base.metadata.create_all(bind=engine)


# Create FastAPI application
app = FastAPI(
    title="Football AI Analysis API",
    description="Backend API for AI-powered football player tracking and performance analysis.",
    version="0.2.0",
)


# Allow React frontend to communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Register API routes
app.include_router(players.router)
app.include_router(teams.router)


# Root endpoint
@app.get("/")
def root():
    return {
        "message": "Football AI Analysis API",
        "status": "running",
    }


# Health endpoint
@app.get("/health")
def health():
    return {
        "status": "healthy",
    }
