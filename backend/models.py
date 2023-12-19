from database import Base
from sqlalchemy import Column, Integer, String, JSON

class Users(Base):
    __tablename__="users"

    name = Column(String, primary_key=True, index=True)
    password =Column(String)

class Exercises(Base):
    __tablename__="exercises"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    level = Column(Integer)

class SavedWindow(Base):
    __tablename__="savedwindow"

    id = Column(Integer, primary_key=True, index=True)
    exerciseData = Column(JSON)