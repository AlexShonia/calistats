from fastapi import FastAPI, HTTPException, Depends
from typing import Annotated, List
from sqlalchemy.orm import Session
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


database = {"name" : 'alex', "mail":'alex.shonia123@gmail.com', "password":'alexus'}

exercise_db = {"One arm pushups": 60, "Pushups": 20, "Planche": 80}

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

class LoginData(BaseModel):
    name: str
    password: str

class LoginResponse(BaseModel):
    name_test: str
    password_test: str    

class ExerciseItem(BaseModel):
    exercise: str
    reps_seconds: str

class ExerciseData(BaseModel):
    exerciseData: List[ExerciseItem]
    
class ExerciseResponse(BaseModel):
    level: float    


@app.post("/load_character/", response_model=LoginResponse)
async def login(login_data: LoginData):
    response = LoginResponse(name_test="wrong name", password_test="wrong password")

    if database["name"] == login_data.name:
        response.name_test="✔️"

    if database["password"] == login_data.password:
        response.password_test = "✔️"

    print(response)

    return response

@app.post("/", response_model=ExerciseResponse)
async def calculate(data : ExerciseData):
    response = ExerciseResponse(level=0)

    print(data)
    sum = 0
    for item in data.exerciseData:
        if item.exercise != "Select an exercise":
            sum += exercise_db[item.exercise]
            response.level = sum / len(data.exerciseData)

    return response    
    
    
