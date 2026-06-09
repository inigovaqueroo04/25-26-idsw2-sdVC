from fastapi import APIRouter, Header, HTTPException

from schemas.groups import (
    GroupCreateRequest,
    GroupCreateResponse,
    GroupListResponse,
    GroupResponse,
)
from services.auth_service import AuthError, obtener_usuario
from services.group_service import GroupError, crear_grupo, listar_grupos_usuario


router = APIRouter()


def raise_auth_error(error: AuthError) -> None:
    raise HTTPException(
        status_code=error.status_code,
        detail={"code": error.code, "message": error.message},
    )


def raise_group_error(error: GroupError) -> None:
    raise HTTPException(
        status_code=error.status_code,
        detail={"code": error.code, "message": error.message},
    )


@router.get("", response_model=GroupListResponse)
def list_groups(x_session_token: str | None = Header(default=None, alias="X-Session-Token")):
    try:
        usuario = obtener_usuario(x_session_token)
    except AuthError as error:
        raise_auth_error(error)

    grupos = listar_grupos_usuario(usuario)
    return GroupListResponse(
        estado="GRUPOS_ABIERTO",
        grupos=[GroupResponse(**grupo.to_response()) for grupo in grupos],
        mensaje="Grupos cargados correctamente.",
    )


@router.post("", response_model=GroupCreateResponse, status_code=201)
def create_group(
    payload: GroupCreateRequest,
    x_session_token: str | None = Header(default=None, alias="X-Session-Token"),
):
    try:
        usuario = obtener_usuario(x_session_token)
        grupo = crear_grupo(usuario, payload.nombre, payload.descripcion)
    except AuthError as error:
        raise_auth_error(error)
    except GroupError as error:
        raise_group_error(error)

    return GroupCreateResponse(
        estado="GRUPO_ABIERTO",
        grupo=GroupResponse(**grupo.to_response()),
        mensaje="Grupo creado correctamente.",
    )
