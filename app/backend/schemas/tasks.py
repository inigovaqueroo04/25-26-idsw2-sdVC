from pydantic import BaseModel


class TaskResponse(BaseModel):
    id: int
    grupo_id: int
    grupo_nombre: str
    titulo: str
    descripcion: str | None
    estado: str
    rol_grupo: str
    es_gestionable: bool


class TaskListResponse(BaseModel):
    estado: str
    tareas: list[TaskResponse]
    mensaje: str
