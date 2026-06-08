from pydantic import BaseModel


class LoginRequest(BaseModel):
    email: str
    password: str


class UserResponse(BaseModel):
    id: int
    nombre: str
    email: str
    rol: str


class LoginResponse(BaseModel):
    token: str
    usuario: UserResponse
    estado: str
    mensaje: str


class MessageResponse(BaseModel):
    estado: str
    mensaje: str

