from pydantic import BaseModel


class TaskCreateRequest(BaseModel):
    grupo_id: int
    titulo: str
    descripcion: str | None = None
    fecha: str
    hora_inicio: str
    hora_fin: str


class TaskResponse(BaseModel):
    id: int
    grupo_id: int
    grupo_nombre: str
    titulo: str
    descripcion: str | None
    fecha: str | None
    hora_inicio: str | None
    hora_fin: str | None
    estado: str
    rol_grupo: str
    es_gestionable: bool


class TaskListResponse(BaseModel):
    estado: str
    tareas: list[TaskResponse]
    mensaje: str


class TaskCreateResponse(BaseModel):
    estado: str
    tarea: TaskResponse
    mensaje: str
