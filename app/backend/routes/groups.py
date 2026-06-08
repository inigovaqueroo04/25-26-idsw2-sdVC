from fastapi import APIRouter, Header, HTTPException

from schemas.groups import GroupListResponse, GroupResponse
from services.auth_service import AuthError, obtener_usuario
from services.group_service import listar_grupos_usuario


router = APIRouter()


def raise_auth_error(error: AuthError) -> None:
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

