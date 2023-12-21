from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Annotated
from sqlalchemy.orm import Session
from sqlalchemy import Select
from sqlalchemy.sql import text

from database import SessionLocal, engine
import models

api_router = APIRouter()

class LoginData(BaseModel):
    email: str
    password: str

    class Config:
        from_attributes = True

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

@api_router.post("/", response_model=LoginData)
async def login(login_data: LoginData, db: db_dependency):

    params = {"email" : login_data.email, "password": login_data.password}
    query = text('SELECT * FROM users WHERE email= :email AND password = :password')
    row = db.execute(query, params).fetchone()

    print(row)
    if row == None:
        print("wrong usernmae")
        raise HTTPException(status_code=401, detail="NOSucc cess")
    else:
        raise HTTPException(status_code=200, detail=row.username)


    