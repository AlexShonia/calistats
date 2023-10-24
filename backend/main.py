from fastapi import FastAPI, HTTPException, Depends
from typing import Annotated, List
from sqlalchemy.orm import Session
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import calculate
import login

app = FastAPI()


database = {"name" : 'alex', "mail":'alex.shonia123@gmail.com', "password":'alexus'}

exercise_db = {"One arm pushups": 48, "Pushups": 8, "Planche": 68}

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials = True,
    allow_methods=["*"],
    allow_headers=["*"]
)


app.include_router(login.api_router, prefix="/load_character")
app.include_router(calculate.api_router, prefix="/calculate")