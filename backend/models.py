from database import Base
from sqlalchemy import Column, Integer, String, Boolean, Float

class Users(Base):
    __tablename__="users"

    name = Column(String, primary_key=True, index=True)
    password =Column(String)