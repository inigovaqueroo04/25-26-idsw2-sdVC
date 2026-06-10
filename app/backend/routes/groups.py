from fastapi import APIRouter, Header, HTTPException

from schemas.groups import (
    GroupCreateRequest,
    GroupCreateResponse,
    GroupDeleteResponse,
    GroupInvitationCreateRequest,
    GroupInvitationCreateResponse,
    GroupInvitationResponse,
    GroupInvitationUpdateRequest,
    GroupInvitationUpdateResponse,
    GroupListResponse,
    GroupMemberListResponse,
    GroupMemberResponse,
    GroupMemberUpdateRequest,
    GroupMemberUpdateResponse,
    GroupResponse,
    GroupUpdateRequest,
    GroupUpdateResponse,
    InvitationListItemResponse,
    InvitationListResponse,
)
from services.auth_service import AuthError, obtener_usuario
from services.group_service import (
    GroupError,
    crear_grupo,
    editar_grupo,
    editar_invitacion,
    editar_miembro,
    eliminar_grupo,
    invitar_usuario,
    listar_invitaciones_usuario,
    listar_grupos_usuario,
    listar_miembros_grupo,
)


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


@router.get("/invitations", response_model=InvitationListResponse)
def list_invitations(
    estado: str | None = None,
    x_session_token: str | None = Header(default=None, alias="X-Session-Token"),
):
    try:
        usuario = obtener_usuario(x_session_token)
        invitaciones = listar_invitaciones_usuario(usuario, estado)
    except AuthError as error:
        raise_auth_error(error)
    except GroupError as error:
        raise_group_error(error)

    return InvitationListResponse(
        estado="INVITACIONES_ABIERTO",
        invitaciones=[InvitationListItemResponse(**invitacion) for invitacion in invitaciones],
        mensaje="Invitaciones cargadas correctamente.",
    )


@router.patch("/invitations/{invitation_id}", response_model=GroupInvitationUpdateResponse)
def update_invitation(
    invitation_id: int,
    payload: GroupInvitationUpdateRequest,
    x_session_token: str | None = Header(default=None, alias="X-Session-Token"),
):
    try:
        usuario = obtener_usuario(x_session_token)
        invitacion = editar_invitacion(usuario, invitation_id, payload.estado)
    except AuthError as error:
        raise_auth_error(error)
    except GroupError as error:
        raise_group_error(error)

    return GroupInvitationUpdateResponse(
        estado="INVITACION_ABIERTA",
        invitacion=InvitationListItemResponse(**invitacion),
        mensaje="Invitacion actualizada correctamente.",
    )


@router.get("/{group_id}/members", response_model=GroupMemberListResponse)
def list_group_members(
    group_id: int,
    x_session_token: str | None = Header(default=None, alias="X-Session-Token"),
):
    try:
        usuario = obtener_usuario(x_session_token)
        miembros = listar_miembros_grupo(usuario, group_id)
    except AuthError as error:
        raise_auth_error(error)
    except GroupError as error:
        raise_group_error(error)

    return GroupMemberListResponse(
        estado="GRUPO_ABIERTO",
        grupo_id=group_id,
        miembros=[GroupMemberResponse(**miembro) for miembro in miembros],
        mensaje="Miembros cargados correctamente.",
    )


@router.patch("/{group_id}/members/{member_id}", response_model=GroupMemberUpdateResponse)
def update_group_member(
    group_id: int,
    member_id: int,
    payload: GroupMemberUpdateRequest,
    x_session_token: str | None = Header(default=None, alias="X-Session-Token"),
):
    try:
        usuario = obtener_usuario(x_session_token)
        miembro = editar_miembro(usuario, group_id, member_id, payload.rol)
    except AuthError as error:
        raise_auth_error(error)
    except GroupError as error:
        raise_group_error(error)

    return GroupMemberUpdateResponse(
        estado="GRUPO_ABIERTO",
        grupo_id=group_id,
        miembro=GroupMemberResponse(**miembro),
        mensaje="Miembro actualizado correctamente.",
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


@router.put("/{group_id}", response_model=GroupUpdateResponse)
def update_group(
    group_id: int,
    payload: GroupUpdateRequest,
    x_session_token: str | None = Header(default=None, alias="X-Session-Token"),
):
    try:
        usuario = obtener_usuario(x_session_token)
        grupo = editar_grupo(usuario, group_id, payload.nombre, payload.descripcion)
    except AuthError as error:
        raise_auth_error(error)
    except GroupError as error:
        raise_group_error(error)

    return GroupUpdateResponse(
        estado="GRUPO_ABIERTO",
        grupo=GroupResponse(**grupo.to_response()),
        mensaje="Grupo actualizado correctamente.",
    )


@router.delete("/{group_id}", response_model=GroupDeleteResponse)
def delete_group(
    group_id: int,
    x_session_token: str | None = Header(default=None, alias="X-Session-Token"),
):
    try:
        usuario = obtener_usuario(x_session_token)
        eliminar_grupo(usuario, group_id)
    except AuthError as error:
        raise_auth_error(error)
    except GroupError as error:
        raise_group_error(error)

    return GroupDeleteResponse(
        estado="GRUPOS_ABIERTO",
        grupo_id=group_id,
        mensaje="Grupo eliminado correctamente.",
    )


@router.post("/{group_id}/invitations", response_model=GroupInvitationCreateResponse, status_code=201)
def invite_user(
    group_id: int,
    payload: GroupInvitationCreateRequest,
    x_session_token: str | None = Header(default=None, alias="X-Session-Token"),
):
    try:
        usuario = obtener_usuario(x_session_token)
        invitacion = invitar_usuario(
            usuario,
            group_id,
            payload.email,
            payload.rol,
            payload.fecha_limite,
        )
    except AuthError as error:
        raise_auth_error(error)
    except GroupError as error:
        raise_group_error(error)

    return GroupInvitationCreateResponse(
        estado="INVITACION_ABIERTA",
        invitacion=GroupInvitationResponse(**invitacion),
        mensaje="Invitacion registrada correctamente.",
    )
