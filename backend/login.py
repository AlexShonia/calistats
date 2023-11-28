from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Annotated
from sqlalchemy.orm import Session
from sqlalchemy import Select
from sqlalchemy.sql import text

from database import SessionLocal, engine
import models

api_router = APIRouter()

class LoginResponse(BaseModel):
    name: str
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

@api_router.post("/", response_model=LoginResponse)
async def login(login_data: LoginResponse, db: db_dependency):

    params = {"username" : login_data.name}
    query = text('SELECT * FROM users WHERE name= :username')
    row = db.execute(query, params).fetchone()
    
    if row == None:
        print("wrong usernmae")
        raise HTTPException(status_code=401, detail="NOSucc cess")
    else:
        print(row)
        raise HTTPException(status_code=200, detail=login_data.name)


    