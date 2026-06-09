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
