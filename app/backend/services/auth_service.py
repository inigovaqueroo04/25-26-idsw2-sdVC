import hashlib
import secrets
import uuid

from database import get_connection
from models.user import Usuario


class AuthError(Exception):
    def __init__(self, code: str, message: str, status_code: int):
        super().__init__(message)
        self.code = code
        self.message = message
        self.status_code = status_code


_sesiones_activas: dict[str, Usuario] = {}


def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode("utf-8")).hexdigest()


def iniciar_sesion(email: str, password: str) -> tuple[str, Usuario]:
    email_normalizado = (email or "").strip().lower()
    password = password or ""

    if not email_normalizado or not password:
        raise AuthError(
            code="campos_vacios",
            message="Email y contraseña son obligatorios.",
            status_code=400,
        )

    with get_connection() as connection:
        row = connection.execute(
            """
            SELECT id, nombre, email, password_hash, rol
            FROM usuarios
            WHERE lower(email) = ?
            """,
            (email_normalizado,),
        ).fetchone()

    if row is None:
        raise AuthError(
            code="usuario_no_encontrado",
            message="No existe un usuario con ese email.",
            status_code=404,
        )

    if not secrets.compare_digest(row["password_hash"], hash_password(password)):
        raise AuthError(
            code="credenciales_invalidas",
            message="Credenciales incorrectas.",
            status_code=401,
        )

    usuario = Usuario.from_row(row)
    token = uuid.uuid4().hex
    _sesiones_activas[token] = usuario
    return token, usuario


def obtener_usuario(token: str | None) -> Usuario:
    if not token or token not in _sesiones_activas:
        raise AuthError(
            code="sesion_no_activa",
            message="No hay una sesión activa.",
            status_code=401,
        )

    return _sesiones_activas[token]


def cerrar_sesion(token: str | None) -> None:
    if not token or token not in _sesiones_activas:
        raise AuthError(
            code="sesion_no_activa",
            message="No hay una sesión activa.",
            status_code=401,
        )

    _sesiones_activas.pop(token)
