from fastapi import APIRouter, Header, HTTPException

from schemas.tasks import (
    TaskCreateRequest,
    TaskCreateResponse,
    TaskDeleteResponse,
    TaskListResponse,
    TaskResponse,
    TaskUpdateRequest,
    TaskUpdateResponse,
)
from services.auth_service import AuthError, obtener_usuario
from services.task_service import TaskError, crear_tarea, editar_tarea, eliminar_tarea, listar_tareas_usuario


router = APIRouter()


def raise_auth_error(error: AuthError) -> None:
    raise HTTPException(
        status_code=error.status_code,
        detail={"code": error.code, "message": error.message},
    )


def raise_task_error(error: TaskError) -> None:
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


@router.post("", response_model=TaskCreateResponse, status_code=201)
def create_task(
    payload: TaskCreateRequest,
    x_session_token: str | None = Header(default=None, alias="X-Session-Token"),
):
    try:
        usuario = obtener_usuario(x_session_token)
        tarea = crear_tarea(
            usuario,
            payload.grupo_id,
            payload.titulo,
            payload.descripcion,
            payload.fecha,
            payload.hora_inicio,
            payload.hora_fin,
        )
    except AuthError as error:
        raise_auth_error(error)
    except TaskError as error:
        raise_task_error(error)

    return TaskCreateResponse(
        estado="TAREA_ABIERTO",
        tarea=TaskResponse(**tarea),
        mensaje="Tarea creada correctamente.",
    )


@router.patch("/{task_id}", response_model=TaskUpdateResponse)
def update_task(
    task_id: int,
    payload: TaskUpdateRequest,
    x_session_token: str | None = Header(default=None, alias="X-Session-Token"),
):
    try:
        usuario = obtener_usuario(x_session_token)
        tarea = editar_tarea(
            usuario,
            task_id,
            payload.titulo,
            payload.descripcion,
            payload.fecha,
            payload.hora_inicio,
            payload.hora_fin,
        )
    except AuthError as error:
        raise_auth_error(error)
    except TaskError as error:
        raise_task_error(error)

    return TaskUpdateResponse(
        estado="TAREA_ABIERTO",
        tarea=TaskResponse(**tarea),
        mensaje="Tarea actualizada correctamente.",
    )


@router.delete("/{task_id}", response_model=TaskDeleteResponse)
def delete_task(
    task_id: int,
    x_session_token: str | None = Header(default=None, alias="X-Session-Token"),
):
    try:
        usuario = obtener_usuario(x_session_token)
        tarea_id = eliminar_tarea(usuario, task_id)
    except AuthError as error:
        raise_auth_error(error)
    except TaskError as error:
        raise_task_error(error)

    return TaskDeleteResponse(
        estado="TAREAS_ABIERTO",
        tarea_id=tarea_id,
        mensaje="Tarea eliminada correctamente.",
    )
