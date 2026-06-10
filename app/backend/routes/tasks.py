from fastapi import APIRouter, Header, HTTPException

from schemas.tasks import TaskListResponse, TaskResponse
from services.auth_service import AuthError, obtener_usuario
from services.task_service import listar_tareas_usuario


router = APIRouter()


def raise_auth_error(error: AuthError) -> None:
    raise HTTPException(
        status_code=error.status_code,
        detail={"code": error.code, "message": error.message},
    )


@router.get("", response_model=TaskListResponse)
def list_tasks(x_session_token: str | None = Header(default=None, alias="X-Session-Token")):
    try:
        usuario = obtener_usuario(x_session_token)
    except AuthError as error:
        raise_auth_error(error)

    tareas = listar_tareas_usuario(usuario)
    return TaskListResponse(
        estado="TAREAS_ABIERTO",
        tareas=[TaskResponse(**tarea) for tarea in tareas],
        mensaje="Tareas cargadas correctamente.",
    )
