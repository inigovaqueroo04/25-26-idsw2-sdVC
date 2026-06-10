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


class GroupInvitationUpdateRequest(BaseModel):
    estado: str


class GroupMemberUpdateRequest(BaseModel):
    rol: str


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


class InvitationListItemResponse(BaseModel):
    id: int
    grupo_id: int
    grupo_nombre: str
    email: str
    rol: str
    fecha_limite: str
    estado: str
    invitado_por: str
    es_destinatario: bool
    es_gestionable: bool


class InvitationListResponse(BaseModel):
    estado: str
    invitaciones: list[InvitationListItemResponse]
    mensaje: str


class GroupInvitationUpdateResponse(BaseModel):
    estado: str
    invitacion: InvitationListItemResponse
    mensaje: str


class GroupMemberResponse(BaseModel):
    id: int
    usuario_id: int
    nombre: str
    email: str
    rol: str
    es_usuario_actual: bool


class GroupMemberListResponse(BaseModel):
    estado: str
    grupo_id: int
    miembros: list[GroupMemberResponse]
    mensaje: str


class GroupMemberUpdateResponse(BaseModel):
    estado: str
    grupo_id: int
    miembro: GroupMemberResponse
    mensaje: str


class GroupMemberDeleteResponse(BaseModel):
    estado: str
    grupo_id: int
    miembro_id: int
    mensaje: str
