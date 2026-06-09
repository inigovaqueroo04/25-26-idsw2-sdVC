from datetime import date
import re

from database import get_connection
from models.group import GrupoResumen
from models.user import Usuario


class GroupError(Exception):
    def __init__(self, code: str, message: str, status_code: int):
        super().__init__(message)
        self.code = code
        self.message = message
        self.status_code = status_code


ROLES_GESTION_GRUPO = {"Administrador", "Miembro Administrador"}
ROL_ELIMINAR_GRUPO = "Administrador"
ROLES_INVITACION = {"Miembro Administrador", "Miembro"}
ESTADOS_INVITACION = {"Pendiente", "Aceptada", "Rechazada", "Caducada", "Cancelada"}
EMAIL_PATTERN = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


def listar_grupos_usuario(usuario: Usuario) -> list[GrupoResumen]:
    with get_connection() as connection:
        rows = connection.execute(
            """
            SELECT
                g.id,
                g.nombre,
                g.descripcion,
                mg.rol,
                (
                    SELECT COUNT(*)
                    FROM miembros_grupo mg_total
                    WHERE mg_total.grupo_id = g.id
                ) AS numero_miembros
            FROM grupos g
            INNER JOIN miembros_grupo mg ON mg.grupo_id = g.id
            WHERE mg.usuario_id = ?
            ORDER BY g.nombre COLLATE NOCASE
            """,
            (usuario.id,),
        ).fetchall()

    return [GrupoResumen.from_row(row) for row in rows]


def obtener_resumen_grupo_usuario(connection, grupo_id: int, usuario_id: int) -> GrupoResumen:
    row = connection.execute(
        """
        SELECT
            g.id,
            g.nombre,
            g.descripcion,
            mg.rol,
            (
                SELECT COUNT(*)
                FROM miembros_grupo mg_total
                WHERE mg_total.grupo_id = g.id
            ) AS numero_miembros
        FROM grupos g
        INNER JOIN miembros_grupo mg ON mg.grupo_id = g.id
        WHERE g.id = ?
          AND mg.usuario_id = ?
        """,
        (grupo_id, usuario_id),
    ).fetchone()

    if row is None:
        raise GroupError(
            code="grupo_no_disponible",
            message="El grupo no existe o no esta disponible para este usuario.",
            status_code=404,
        )

    return GrupoResumen.from_row(row)


def validar_nombre_grupo(nombre: str) -> str:
    nombre_normalizado = (nombre or "").strip()

    if not nombre_normalizado:
        raise GroupError(
            code="nombre_obligatorio",
            message="El nombre del grupo es obligatorio.",
            status_code=400,
        )

    return nombre_normalizado


def validar_nombre_duplicado(connection, usuario_id: int, nombre: str, grupo_id: int | None = None) -> None:
    if grupo_id is None:
        row = connection.execute(
            """
            SELECT 1
            FROM grupos g
            INNER JOIN miembros_grupo mg ON mg.grupo_id = g.id
            WHERE mg.usuario_id = ?
              AND lower(g.nombre) = lower(?)
            LIMIT 1
            """,
            (usuario_id, nombre),
        ).fetchone()
    else:
        row = connection.execute(
            """
            SELECT 1
            FROM grupos g
            INNER JOIN miembros_grupo mg ON mg.grupo_id = g.id
            WHERE mg.usuario_id = ?
              AND lower(g.nombre) = lower(?)
              AND g.id <> ?
            LIMIT 1
            """,
            (usuario_id, nombre, grupo_id),
        ).fetchone()

    if row is not None:
        raise GroupError(
            code="grupo_duplicado",
            message="Ya existe un grupo con ese nombre para este usuario.",
            status_code=409,
        )


def validar_email_invitacion(email: str) -> str:
    email_normalizado = (email or "").strip().lower()

    if not email_normalizado or not EMAIL_PATTERN.match(email_normalizado):
        raise GroupError(
            code="email_invalido",
            message="El email de la invitacion no es valido.",
            status_code=400,
        )

    return email_normalizado


def validar_fecha_limite(fecha_limite: str) -> str:
    fecha_normalizada = (fecha_limite or "").strip()

    try:
        fecha = date.fromisoformat(fecha_normalizada)
    except ValueError as error:
        raise GroupError(
            code="fecha_limite_invalida",
            message="La fecha limite debe tener formato AAAA-MM-DD.",
            status_code=400,
        ) from error

    if fecha < date.today():
        raise GroupError(
            code="fecha_limite_caducada",
            message="La fecha limite no puede estar en el pasado.",
            status_code=400,
        )

    return fecha.isoformat()


def validar_rol_invitacion(rol: str) -> str:
    rol_normalizado = (rol or "").strip() or "Miembro"

    if rol_normalizado not in ROLES_INVITACION:
        raise GroupError(
            code="rol_invitacion_invalido",
            message="El rol propuesto para la invitacion no es valido.",
            status_code=400,
        )

    return rol_normalizado


def validar_estado_invitacion(estado: str | None) -> str | None:
    estado_normalizado = (estado or "").strip()

    if not estado_normalizado:
        return None

    if estado_normalizado not in ESTADOS_INVITACION:
        raise GroupError(
            code="estado_invitacion_invalido",
            message="El estado de invitacion solicitado no es valido.",
            status_code=400,
        )

    return estado_normalizado


def crear_grupo(usuario: Usuario, nombre: str, descripcion: str | None) -> GrupoResumen:
    if usuario.rol != "Administrador":
        raise GroupError(
            code="usuario_sin_permisos",
            message="Solo un administrador puede crear grupos.",
            status_code=403,
        )

    nombre_normalizado = validar_nombre_grupo(nombre)
    descripcion_normalizada = (descripcion or "").strip() or None

    with get_connection() as connection:
        validar_nombre_duplicado(connection, usuario.id, nombre_normalizado)

        cursor = connection.execute(
            """
            INSERT INTO grupos (nombre, descripcion, creado_por)
            VALUES (?, ?, ?)
            """,
            (nombre_normalizado, descripcion_normalizada, usuario.id),
        )
        group_id = cursor.lastrowid

        connection.execute(
            """
            INSERT INTO miembros_grupo (usuario_id, grupo_id, rol)
            VALUES (?, ?, ?)
            """,
            (usuario.id, group_id, "Administrador"),
        )

        grupo = obtener_resumen_grupo_usuario(connection, group_id, usuario.id)

    return grupo


def editar_grupo(
    usuario: Usuario,
    grupo_id: int,
    nombre: str,
    descripcion: str | None,
) -> GrupoResumen:
    nombre_normalizado = validar_nombre_grupo(nombre)
    descripcion_normalizada = (descripcion or "").strip() or None

    with get_connection() as connection:
        grupo_actual = obtener_resumen_grupo_usuario(connection, grupo_id, usuario.id)

        if grupo_actual.rol not in ROLES_GESTION_GRUPO:
            raise GroupError(
                code="usuario_sin_permisos",
                message="No tienes permisos para editar este grupo.",
                status_code=403,
            )

        validar_nombre_duplicado(connection, usuario.id, nombre_normalizado, grupo_id)

        connection.execute(
            """
            UPDATE grupos
            SET nombre = ?,
                descripcion = ?
            WHERE id = ?
            """,
            (nombre_normalizado, descripcion_normalizada, grupo_id),
        )

        grupo = obtener_resumen_grupo_usuario(connection, grupo_id, usuario.id)

    return grupo


def eliminar_grupo(usuario: Usuario, grupo_id: int) -> None:
    with get_connection() as connection:
        grupo_actual = obtener_resumen_grupo_usuario(connection, grupo_id, usuario.id)

        if grupo_actual.rol != ROL_ELIMINAR_GRUPO:
            raise GroupError(
                code="usuario_sin_permisos",
                message="Solo un administrador del grupo puede eliminarlo.",
                status_code=403,
            )

        connection.execute(
            """
            DELETE FROM invitaciones
            WHERE grupo_id = ?
            """,
            (grupo_id,),
        )
        connection.execute(
            """
            DELETE FROM miembros_grupo
            WHERE grupo_id = ?
            """,
            (grupo_id,),
        )
        connection.execute(
            """
            DELETE FROM grupos
            WHERE id = ?
            """,
            (grupo_id,),
        )


def invitar_usuario(
    usuario: Usuario,
    grupo_id: int,
    email: str,
    rol: str,
    fecha_limite: str,
) -> dict:
    email_normalizado = validar_email_invitacion(email)
    rol_normalizado = validar_rol_invitacion(rol)
    fecha_normalizada = validar_fecha_limite(fecha_limite)

    with get_connection() as connection:
        grupo_actual = obtener_resumen_grupo_usuario(connection, grupo_id, usuario.id)

        if grupo_actual.rol not in ROLES_GESTION_GRUPO:
            raise GroupError(
                code="usuario_sin_permisos",
                message="No tienes permisos para invitar usuarios a este grupo.",
                status_code=403,
            )

        miembro_existente = connection.execute(
            """
            SELECT 1
            FROM usuarios u
            INNER JOIN miembros_grupo mg ON mg.usuario_id = u.id
            WHERE mg.grupo_id = ?
              AND lower(u.email) = ?
            LIMIT 1
            """,
            (grupo_id, email_normalizado),
        ).fetchone()

        if miembro_existente is not None:
            raise GroupError(
                code="usuario_ya_miembro",
                message="Ese usuario ya pertenece al grupo.",
                status_code=409,
            )

        invitacion_existente = connection.execute(
            """
            SELECT 1
            FROM invitaciones
            WHERE grupo_id = ?
              AND email_invitado = ?
              AND estado = 'Pendiente'
            LIMIT 1
            """,
            (grupo_id, email_normalizado),
        ).fetchone()

        if invitacion_existente is not None:
            raise GroupError(
                code="invitacion_duplicada",
                message="Ya existe una invitacion pendiente para ese email.",
                status_code=409,
            )

        cursor = connection.execute(
            """
            INSERT INTO invitaciones (
                grupo_id,
                email_invitado,
                rol_propuesto,
                fecha_limite,
                estado,
                invitado_por
            )
            VALUES (?, ?, ?, ?, 'Pendiente', ?)
            """,
            (grupo_id, email_normalizado, rol_normalizado, fecha_normalizada, usuario.id),
        )
        invitacion_id = cursor.lastrowid

    return {
        "id": invitacion_id,
        "grupo_id": grupo_id,
        "email": email_normalizado,
        "rol": rol_normalizado,
        "fecha_limite": fecha_normalizada,
        "estado": "Pendiente",
    }


def listar_invitaciones_usuario(usuario: Usuario, estado: str | None = None) -> list[dict]:
    estado_normalizado = validar_estado_invitacion(estado)
    email_usuario = usuario.email.lower()
    params: list[object] = [email_usuario, usuario.id, email_usuario]
    estado_filter = ""

    if estado_normalizado is not None:
        estado_filter = "AND i.estado = ?"
        params.append(estado_normalizado)

    with get_connection() as connection:
        rows = connection.execute(
            f"""
            SELECT
                i.id,
                i.grupo_id,
                g.nombre AS grupo_nombre,
                i.email_invitado AS email,
                i.rol_propuesto AS rol,
                i.fecha_limite,
                i.estado,
                u.nombre AS invitado_por,
                CASE
                    WHEN lower(i.email_invitado) = lower(?) THEN 1
                    ELSE 0
                END AS es_destinatario,
                CASE
                    WHEN mg.rol IN ('Administrador', 'Miembro Administrador') THEN 1
                    ELSE 0
                END AS es_gestionable
            FROM invitaciones i
            INNER JOIN grupos g ON g.id = i.grupo_id
            INNER JOIN usuarios u ON u.id = i.invitado_por
            LEFT JOIN miembros_grupo mg
                ON mg.grupo_id = i.grupo_id
               AND mg.usuario_id = ?
            WHERE (
                lower(i.email_invitado) = lower(?)
                OR mg.rol IN ('Administrador', 'Miembro Administrador')
            )
            {estado_filter}
            ORDER BY
                CASE i.estado
                    WHEN 'Pendiente' THEN 0
                    WHEN 'Aceptada' THEN 1
                    WHEN 'Rechazada' THEN 2
                    WHEN 'Caducada' THEN 3
                    ELSE 4
                END,
                i.fecha_limite ASC,
                g.nombre COLLATE NOCASE
            """,
            params,
        ).fetchall()

    return [
        {
            "id": row["id"],
            "grupo_id": row["grupo_id"],
            "grupo_nombre": row["grupo_nombre"],
            "email": row["email"],
            "rol": row["rol"],
            "fecha_limite": row["fecha_limite"],
            "estado": row["estado"],
            "invitado_por": row["invitado_por"],
            "es_destinatario": bool(row["es_destinatario"]),
            "es_gestionable": bool(row["es_gestionable"]),
        }
        for row in rows
    ]
