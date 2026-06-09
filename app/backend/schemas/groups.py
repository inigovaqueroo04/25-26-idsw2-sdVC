from pydantic import BaseModel


class GroupCreateRequest(BaseModel):
    nombre: str
    descripcion: str | None = None


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


class GroupCreateResponse(BaseModel):
    estado: str
    grupo: GroupResponse
    mensaje: str
