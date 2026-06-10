from datetime import date, time

from database import get_connection
from models.user import Usuario


ROLES_GESTION_TAREAS = {"Administrador", "Miembro Administrador"}
ESTADOS_TAREA_NO_EDITABLES = {"Finalizada", "Cancelada"}


class TaskError(Exception):
    def __init__(self, code: str, message: str, status_code: int):
        super().__init__(message)
        self.code = code
        self.message = message
        self.status_code = status_code


def tarea_row_to_response(row) -> dict:
    return {
        "id": row["id"],
        "grupo_id": row["grupo_id"],
        "grupo_nombre": row["grupo_nombre"],
        "titulo": row["titulo"],
        "descripcion": row["descripcion"],
        "fecha": row["fecha"],
        "hora_inicio": row["hora_inicio"],
        "hora_fin": row["hora_fin"],
        "estado": row["estado"],
        "rol_grupo": row["rol_grupo"],
        "es_gestionable": row["rol_grupo"] in ROLES_GESTION_TAREAS,
    }


def validar_titulo_tarea(titulo: str) -> str:
    titulo_normalizado = (titulo or "").strip()

    if not titulo_normalizado:
        raise TaskError(
            code="titulo_obligatorio",
            message="El titulo de la tarea es obligatorio.",
            status_code=400,
        )

    return titulo_normalizado


def validar_fecha_tarea(fecha: str) -> str:
    fecha_normalizada = (fecha or "").strip()

    try:
        return date.fromisoformat(fecha_normalizada).isoformat()
    except ValueError as error:
        raise TaskError(
            code="fecha_invalida",
            message="La fecha de la tarea debe tener formato AAAA-MM-DD.",
            status_code=400,
        ) from error


def validar_hora_tarea(hora: str, code: str, message: str) -> str:
    hora_normalizada = (hora or "").strip()

    try:
        return time.fromisoformat(hora_normalizada).strftime("%H:%M")
    except ValueError as error:
        raise TaskError(code=code, message=message, status_code=400) from error


def validar_horario_tarea(hora_inicio: str, hora_fin: str) -> tuple[str, str]:
    inicio = validar_hora_tarea(
        hora_inicio,
        code="hora_inicio_invalida",
        message="La hora de inicio debe tener formato HH:MM.",
    )
    fin = validar_hora_tarea(
        hora_fin,
        code="hora_fin_invalida",
        message="La hora de fin debe tener formato HH:MM.",
    )

    if inicio >= fin:
        raise TaskError(
            code="horario_invalido",
            message="La hora de inicio debe ser anterior a la hora de fin.",
            status_code=400,
        )

    return inicio, fin


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
                t.fecha,
                t.hora_inicio,
                t.hora_fin,
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


def crear_tarea(
    usuario: Usuario,
    grupo_id: int,
    titulo: str,
    descripcion: str | None,
    fecha: str,
    hora_inicio: str,
    hora_fin: str,
) -> dict:
    titulo_normalizado = validar_titulo_tarea(titulo)
    descripcion_normalizada = (descripcion or "").strip() or None
    fecha_normalizada = validar_fecha_tarea(fecha)
    inicio_normalizado, fin_normalizado = validar_horario_tarea(hora_inicio, hora_fin)

    with get_connection() as connection:
        grupo = connection.execute(
            """
            SELECT
                g.id,
                mg.rol
            FROM grupos g
            INNER JOIN miembros_grupo mg
                ON mg.grupo_id = g.id
               AND mg.usuario_id = ?
            WHERE g.id = ?
            """,
            (usuario.id, grupo_id),
        ).fetchone()

        if grupo is None:
            raise TaskError(
                code="grupo_no_disponible",
                message="El grupo no existe o no esta disponible para este usuario.",
                status_code=404,
            )

        if grupo["rol"] not in ROLES_GESTION_TAREAS:
            raise TaskError(
                code="usuario_sin_permisos",
                message="No tienes permisos para crear tareas en este grupo.",
                status_code=403,
            )

        cursor = connection.execute(
            """
            INSERT INTO tareas (
                grupo_id,
                titulo,
                descripcion,
                fecha,
                hora_inicio,
                hora_fin,
                estado,
                creado_por
            )
            VALUES (?, ?, ?, ?, ?, ?, 'Programada', ?)
            """,
            (
                grupo_id,
                titulo_normalizado,
                descripcion_normalizada,
                fecha_normalizada,
                inicio_normalizado,
                fin_normalizado,
                usuario.id,
            ),
        )
        tarea_id = cursor.lastrowid

        row = connection.execute(
            """
            SELECT
                t.id,
                t.grupo_id,
                g.nombre AS grupo_nombre,
                t.titulo,
                t.descripcion,
                t.fecha,
                t.hora_inicio,
                t.hora_fin,
                t.estado,
                mg.rol AS rol_grupo
            FROM tareas t
            INNER JOIN grupos g ON g.id = t.grupo_id
            INNER JOIN miembros_grupo mg
                ON mg.grupo_id = t.grupo_id
               AND mg.usuario_id = ?
            WHERE t.id = ?
            """,
            (usuario.id, tarea_id),
        ).fetchone()

    return tarea_row_to_response(row)


def editar_tarea(
    usuario: Usuario,
    tarea_id: int,
    titulo: str,
    descripcion: str | None,
    fecha: str,
    hora_inicio: str,
    hora_fin: str,
) -> dict:
    titulo_normalizado = validar_titulo_tarea(titulo)
    descripcion_normalizada = (descripcion or "").strip() or None
    fecha_normalizada = validar_fecha_tarea(fecha)
    inicio_normalizado, fin_normalizado = validar_horario_tarea(hora_inicio, hora_fin)

    with get_connection() as connection:
        tarea = connection.execute(
            """
            SELECT
                t.id,
                t.estado,
                mg.rol AS rol_grupo
            FROM tareas t
            INNER JOIN miembros_grupo mg
                ON mg.grupo_id = t.grupo_id
               AND mg.usuario_id = ?
            WHERE t.id = ?
            """,
            (usuario.id, tarea_id),
        ).fetchone()

        if tarea is None:
            raise TaskError(
                code="tarea_no_disponible",
                message="La tarea no existe o no esta disponible para este usuario.",
                status_code=404,
            )

        if tarea["rol_grupo"] not in ROLES_GESTION_TAREAS:
            raise TaskError(
                code="usuario_sin_permisos",
                message="No tienes permisos para editar esta tarea.",
                status_code=403,
            )

        if tarea["estado"] in ESTADOS_TAREA_NO_EDITABLES:
            raise TaskError(
                code="tarea_no_editable",
                message="No se puede editar una tarea finalizada o cancelada.",
                status_code=409,
            )

        connection.execute(
            """
            UPDATE tareas
               SET titulo = ?,
                   descripcion = ?,
                   fecha = ?,
                   hora_inicio = ?,
                   hora_fin = ?
             WHERE id = ?
            """,
            (
                titulo_normalizado,
                descripcion_normalizada,
                fecha_normalizada,
                inicio_normalizado,
                fin_normalizado,
                tarea_id,
            ),
        )

        row = connection.execute(
            """
            SELECT
                t.id,
                t.grupo_id,
                g.nombre AS grupo_nombre,
                t.titulo,
                t.descripcion,
                t.fecha,
                t.hora_inicio,
                t.hora_fin,
                t.estado,
                mg.rol AS rol_grupo
            FROM tareas t
            INNER JOIN grupos g ON g.id = t.grupo_id
            INNER JOIN miembros_grupo mg
                ON mg.grupo_id = t.grupo_id
               AND mg.usuario_id = ?
            WHERE t.id = ?
            """,
            (usuario.id, tarea_id),
        ).fetchone()

    return tarea_row_to_response(row)
