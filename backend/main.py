from fastapi import FastAPI, HTTPException, Depends
from typing import Annotated, List
from sqlalchemy.orm import Session
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


database = {"name" : 'alex', "mail":'alex.shonia123@gmail.com', "password":'alexus'}

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


class LoginBase(BaseModel):
    name: str
    password: str

class LoginResponse(BaseModel):
    name_test: str
    password_test: str    
                    

@app.post("/load_character/", response_model=LoginResponse)
async def login(login_data: LoginBase):
    response = LoginResponse(name_test="wrong name", password_test="wrong password")

    if database["name"] == login_data.name:
        response.name_test="✔️"

    if database["password"] == login_data.password:
        response.password_test = "✔️"

    print(response)

    return response
