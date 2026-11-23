
import os
import time

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai
from google.genai import types

load_dotenv()

app = FastAPI(title="CancerCare Companion API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

api_key = os.getenv("GEMINI_API_KEY")

client = (
    genai.Client(
        api_key=api_key,
        http_options=types.HttpOptions(
            timeout=30000,
            retry_options=types.HttpRetryOptions(
                attempts=2,
                initial_delay=2,
                max_delay=8,
                exp_base=2,
            ),
        ),
    )
    if api_key else None
)


class ChatRequest(BaseModel):
    message: str


@app.get("/")
def home():
    return {"message": "CancerCare Companion API is running"}


@app.post("/chat")
def chat(request: ChatRequest):

    if not client:
        raise HTTPException(
            status_code=500,
            detail="API key is missing."
        )

    try:
        response = client.models.generate_content(
            model="gemini-3.5-flash-lite",
            contents=(
                "You are CancerCare Companion, an educational "
                "and supportive assistant. Provide general "
                "cancer information. Never diagnose or prescribe "
                "treatment. Encourage users to consult their "
                "oncology team. For urgent symptoms, advise "
                "urgent medical care.\n\n"
                + request.message
            ),
        )

        return {"reply": response.text}

    except Exception as e:
        print("GEMINI ERROR:", repr(e))

        raise HTTPException(
            status_code=503,
            detail=(
                "The AI service is temporarily busy. "
                "Please try again later."
            )
        )
