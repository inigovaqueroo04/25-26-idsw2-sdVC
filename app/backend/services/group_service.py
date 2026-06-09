from database import get_connection
from models.group import GrupoResumen
from models.user import Usuario


class GroupError(Exception):
    def __init__(self, code: str, message: str, status_code: int):
        super().__init__(message)
        self.code = code
        self.message = message
        self.status_code = status_code


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


def crear_grupo(usuario: Usuario, nombre: str, descripcion: str | None) -> GrupoResumen:
    if usuario.rol != "Administrador":
        raise GroupError(
            code="usuario_sin_permisos",
            message="Solo un administrador puede crear grupos.",
            status_code=403,
        )

    nombre_normalizado = (nombre or "").strip()
    descripcion_normalizada = (descripcion or "").strip() or None

    if not nombre_normalizado:
        raise GroupError(
            code="nombre_obligatorio",
            message="El nombre del grupo es obligatorio.",
            status_code=400,
        )

    with get_connection() as connection:
        duplicated = connection.execute(
            """
            SELECT 1
            FROM grupos g
            INNER JOIN miembros_grupo mg ON mg.grupo_id = g.id
            WHERE mg.usuario_id = ?
              AND lower(g.nombre) = lower(?)
            LIMIT 1
            """,
            (usuario.id, nombre_normalizado),
        ).fetchone()

        if duplicated is not None:
            raise GroupError(
                code="grupo_duplicado",
                message="Ya existe un grupo con ese nombre para este usuario.",
                status_code=409,
            )

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
            (group_id, usuario.id),
        ).fetchone()

    return GrupoResumen.from_row(row)
