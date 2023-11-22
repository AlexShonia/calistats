from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Annotated
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from sqlalchemy import Select
from sqlalchemy.sql import text

from database import SessionLocal
import models

api_router = APIRouter()

class RegisterResponse(BaseModel):
    name: str
    password: str

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

@api_router.post("/", response_model=RegisterResponse)
async def register(register_data: RegisterResponse, db: db_dependency):
    try:
        db_register = models.Users(**register_data.model_dump())
        db.add(db_register)
        db.commit()
        db.refresh(db_register)
        raise HTTPException(status_code=200, detail="Succ cess")
    
    except IntegrityError:
        raise HTTPException(status_code=404, detail="Name Occupied")