from database import get_connection
from models.group import GrupoResumen
from models.user import Usuario


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

