from database import Base
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, JSON, ForeignKey

class User(Base):
    __tablename__="users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password =Column(String)

    savedchoices = relationship("SavedChoice", back_populates="user")
class Exercise(Base):
    __tablename__="exercises"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    level = Column(Integer)

class SavedChoice(Base):
    __tablename__="savedchoices"

    id = Column(Integer, primary_key=True, index=True)
    exerciseData = Column(JSON)

    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    user = relationship("User", back_populates="savedchoices")
