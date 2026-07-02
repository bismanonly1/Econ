from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="EconArena API",
    description="Backend API for the EconArena autonomous market laboratory.",
    version="0.1.0",
)

# During local development, the Next.js frontend runs on port 3000.
ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)


@app.get("/", tags=["System"])
def root() -> dict[str, str]:
    """Return basic API information."""
    return {
        "message": "Welcome to the EconArena API",
        "documentation": "/docs",
    }


@app.get("/health", tags=["System"])
def health_check() -> dict[str, str]:
    """Confirm that the API is running."""
    return {
        "status": "healthy",
        "service": "EconArena API",
        "version": "0.1.0",
    }
