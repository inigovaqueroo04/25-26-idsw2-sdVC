from database import get_connection
from models.user import Usuario


ROLES_GESTION_TAREAS = {"Administrador", "Miembro Administrador"}


def tarea_row_to_response(row) -> dict:
    return {
        "id": row["id"],
        "grupo_id": row["grupo_id"],
        "grupo_nombre": row["grupo_nombre"],
        "titulo": row["titulo"],
        "descripcion": row["descripcion"],
        "estado": row["estado"],
        "rol_grupo": row["rol_grupo"],
        "es_gestionable": row["rol_grupo"] in ROLES_GESTION_TAREAS,
    }


def listar_tareas_usuario(usuario: Usuario) -> list[dict]:
    with get_connection() as connection:
        rows = connection.execute(
            """
            SELECT
                t.id,
                t.grupo_id,
                g.nombre AS grupo_nombre,
                t.titulo,
                t.descripcion,
                t.estado,
                mg.rol AS rol_grupo
            FROM tareas t
            INNER JOIN grupos g ON g.id = t.grupo_id
            INNER JOIN miembros_grupo mg
                ON mg.grupo_id = t.grupo_id
               AND mg.usuario_id = ?
            ORDER BY
                CASE t.estado
                    WHEN 'Creada' THEN 0
                    WHEN 'Programada' THEN 1
                    WHEN 'En ejecucion' THEN 2
                    WHEN 'Finalizada' THEN 3
                    ELSE 4
                END,
                g.nombre COLLATE NOCASE,
                t.titulo COLLATE NOCASE
            """,
            (usuario.id,),
        ).fetchall()

    return [tarea_row_to_response(row) for row in rows]
