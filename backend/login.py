from fastapi import APIRouter
from pydantic import BaseModel

api_router = APIRouter()

class LoginData(BaseModel):
    name: str
    password: str

class LoginResponse(BaseModel):
    name_test: str
    password_test: str    

    
@api_router.post("/", response_model=LoginResponse)
async def login(login_data: LoginData):
    from main import database
    response = LoginResponse(name_test="wrong name", password_test="wrong password")

    if database["name"] == login_data.name:
        response.name_test="✔️"

    if database["password"] == login_data.password:
        response.password_test = "✔️"

    print(response)

    return response