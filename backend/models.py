from database import Base
from sqlalchemy import Column, Integer, String, Boolean, Float

class Users(Base):
    __tablename__="users"

    name = Column(String, primary_key=True, index=True)
    password =Column(String)

class Exercises(Base):
    __tablename__="exercises"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    level = Column(Integer)

