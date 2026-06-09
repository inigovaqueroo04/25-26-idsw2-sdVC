from pydantic import BaseModel


class GroupCreateRequest(BaseModel):
    nombre: str
    descripcion: str | None = None


class GroupUpdateRequest(BaseModel):
    nombre: str
    descripcion: str | None = None


class GroupInvitationCreateRequest(BaseModel):
    email: str
    rol: str = "Miembro"
    fecha_limite: str


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


class GroupUpdateResponse(BaseModel):
    estado: str
    grupo: GroupResponse
    mensaje: str


class GroupDeleteResponse(BaseModel):
    estado: str
    grupo_id: int
    mensaje: str


class GroupInvitationResponse(BaseModel):
    id: int
    grupo_id: int
    email: str
    rol: str
    fecha_limite: str
    estado: str


class GroupInvitationCreateResponse(BaseModel):
    estado: str
    invitacion: GroupInvitationResponse
    mensaje: str
