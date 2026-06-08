from fastapi import APIRouter, Header, HTTPException

from schemas.auth import LoginRequest, LoginResponse, MessageResponse, UserResponse
from services.auth_service import AuthError, cerrar_sesion, iniciar_sesion, obtener_usuario


router = APIRouter()


def raise_auth_error(error: AuthError) -> None:
    raise HTTPException(
        status_code=error.status_code,
        detail={"code": error.code, "message": error.message},
    )


@router.post("/login", response_model=LoginResponse)
def login(payload: LoginRequest):
    try:
        token, usuario = iniciar_sesion(payload.email, payload.password)
    except AuthError as error:
        raise_auth_error(error)

    return LoginResponse(
        token=token,
        usuario=UserResponse(**usuario.to_response()),
        estado="SISTEMA_DISPONIBLE",
        mensaje="Sesion iniciada correctamente.",
    )


@router.post("/logout", response_model=MessageResponse)
def logout(x_session_token: str | None = Header(default=None, alias="X-Session-Token")):
    try:
        cerrar_sesion(x_session_token)
    except AuthError as error:
        raise_auth_error(error)

    return MessageResponse(
        estado="SESION_CERRADA",
        mensaje="Sesion cerrada correctamente.",
    )


@router.get("/me", response_model=UserResponse)
def me(x_session_token: str | None = Header(default=None, alias="X-Session-Token")):
    try:
        usuario = obtener_usuario(x_session_token)
    except AuthError as error:
        raise_auth_error(error)

    return UserResponse(**usuario.to_response())
