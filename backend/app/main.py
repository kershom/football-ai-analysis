from fastapi import FastAPI

app = FastAPI(
    title="Football AI Analysis API",
    description="Backend API for AI-powered football player tracking and performance analysis.",
    version="0.1.0",
)


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
