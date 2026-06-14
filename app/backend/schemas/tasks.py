from pydantic import BaseModel


class TaskCreateRequest(BaseModel):
    grupo_id: int
    titulo: str
    descripcion: str | None = None
    fecha: str
    hora_inicio: str
    hora_fin: str
    recordatorio_minutos: int | None = None


class TaskUpdateRequest(BaseModel):
    titulo: str
    descripcion: str | None = None
    fecha: str
    hora_inicio: str
    hora_fin: str
    asignado_usuario_id: int | None = None
    localizacion: str | None = None
    recordatorio_minutos: int | None = None
    predecesora_tarea_id: int | None = None


class TaskScheduleConflictResponse(BaseModel):
    id: int
    titulo: str
    hora_inicio: str | None
    hora_fin: str | None


class TaskResponse(BaseModel):
    id: int
    grupo_id: int
    grupo_nombre: str
    titulo: str
    descripcion: str | None
    fecha: str | None
    hora_inicio: str | None
    hora_fin: str | None
    fecha_finalizacion: str | None
    asignado_usuario_id: int | None
    asignado_nombre: str | None
    asignado_email: str | None
    localizacion: str | None
    recordatorio_minutos: int | None
    predecesora_tarea_id: int | None
    predecesora_titulo: str | None
    conflictos_horario: list[TaskScheduleConflictResponse]
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


class TaskUpdateResponse(BaseModel):
    estado: str
    tarea: TaskResponse
    mensaje: str


class TaskDeleteResponse(BaseModel):
    estado: str
    tarea_id: int
    mensaje: str


class TaskCompleteResponse(BaseModel):
    estado: str
    tarea: TaskResponse
    mensaje: str
