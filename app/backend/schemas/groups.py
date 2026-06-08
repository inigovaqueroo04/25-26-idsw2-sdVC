from pydantic import BaseModel


class GroupResponse(BaseModel):
    id: int
    nombre: str
    descripcion: str | None
    rol: str
    numero_miembros: int


class GroupListResponse(BaseModel):
    estado: str
    grupos: list[GroupResponse]
    mensaje: str

