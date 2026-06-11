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


def tarea_row_to_response(row, conflictos_horario: list[dict] | None = None) -> dict:
    return {
        "id": row["id"],
        "grupo_id": row["grupo_id"],
        "grupo_nombre": row["grupo_nombre"],
        "titulo": row["titulo"],
        "descripcion": row["descripcion"],
        "fecha": row["fecha"],
        "hora_inicio": row["hora_inicio"],
        "hora_fin": row["hora_fin"],
        "fecha_finalizacion": row["fecha_finalizacion"],
        "asignado_usuario_id": row["asignado_usuario_id"],
        "asignado_nombre": row["asignado_nombre"],
        "asignado_email": row["asignado_email"],
        "localizacion": row["localizacion"],
        "recordatorio_minutos": row["recordatorio_minutos"],
        "conflictos_horario": conflictos_horario or [],
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


def validar_recordatorio_tarea(recordatorio_minutos: int | None) -> int | None:
    if recordatorio_minutos is None:
        return None

    if recordatorio_minutos < 0 or recordatorio_minutos > 10080:
        raise TaskError(
            code="recordatorio_invalido",
            message="El recordatorio debe estar entre 0 y 10080 minutos.",
            status_code=400,
        )

    return recordatorio_minutos


def normalizar_texto_opcional(value: str | None) -> str | None:
    return (value or "").strip() or None


def buscar_conflictos_horario(connection, tarea) -> list[dict]:
    if (
        tarea["asignado_usuario_id"] is None
        or tarea["fecha"] is None
        or tarea["hora_inicio"] is None
        or tarea["hora_fin"] is None
    ):
        return []

    rows = connection.execute(
        """
        SELECT
            id,
            titulo,
            hora_inicio,
            hora_fin
        FROM tareas
        WHERE id <> ?
          AND asignado_usuario_id = ?
          AND fecha = ?
          AND estado NOT IN ('Finalizada', 'Cancelada')
          AND hora_inicio < ?
          AND hora_fin > ?
        ORDER BY hora_inicio, titulo COLLATE NOCASE
        """,
        (
            tarea["id"],
            tarea["asignado_usuario_id"],
            tarea["fecha"],
            tarea["hora_fin"],
            tarea["hora_inicio"],
        ),
    ).fetchall()

    return [
        {
            "id": row["id"],
            "titulo": row["titulo"],
            "hora_inicio": row["hora_inicio"],
            "hora_fin": row["hora_fin"],
        }
        for row in rows
    ]


def tarea_row_to_response_con_conflictos(connection, row) -> dict:
    return tarea_row_to_response(row, buscar_conflictos_horario(connection, row))


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
                t.fecha_finalizacion,
                t.asignado_usuario_id,
                asignado.nombre AS asignado_nombre,
                asignado.email AS asignado_email,
                t.localizacion,
                t.recordatorio_minutos,
                t.estado,
                mg.rol AS rol_grupo
            FROM tareas t
            INNER JOIN grupos g ON g.id = t.grupo_id
            INNER JOIN miembros_grupo mg
                ON mg.grupo_id = t.grupo_id
               AND mg.usuario_id = ?
            LEFT JOIN usuarios asignado ON asignado.id = t.asignado_usuario_id
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

        return [tarea_row_to_response_con_conflictos(connection, row) for row in rows]


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
                t.fecha_finalizacion,
                t.asignado_usuario_id,
                asignado.nombre AS asignado_nombre,
                asignado.email AS asignado_email,
                t.localizacion,
                t.recordatorio_minutos,
                t.estado,
                mg.rol AS rol_grupo
            FROM tareas t
            INNER JOIN grupos g ON g.id = t.grupo_id
            INNER JOIN miembros_grupo mg
                ON mg.grupo_id = t.grupo_id
               AND mg.usuario_id = ?
            LEFT JOIN usuarios asignado ON asignado.id = t.asignado_usuario_id
            WHERE t.id = ?
            """,
            (usuario.id, tarea_id),
        ).fetchone()

        return tarea_row_to_response_con_conflictos(connection, row)


def editar_tarea(
    usuario: Usuario,
    tarea_id: int,
    titulo: str,
    descripcion: str | None,
    fecha: str,
    hora_inicio: str,
    hora_fin: str,
    asignado_usuario_id: int | None,
    localizacion: str | None,
    recordatorio_minutos: int | None,
) -> dict:
    titulo_normalizado = validar_titulo_tarea(titulo)
    descripcion_normalizada = normalizar_texto_opcional(descripcion)
    fecha_normalizada = validar_fecha_tarea(fecha)
    inicio_normalizado, fin_normalizado = validar_horario_tarea(hora_inicio, hora_fin)
    localizacion_normalizada = normalizar_texto_opcional(localizacion)
    recordatorio_normalizado = validar_recordatorio_tarea(recordatorio_minutos)

    with get_connection() as connection:
        tarea = connection.execute(
            """
            SELECT
                t.id,
                t.grupo_id,
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

        if asignado_usuario_id is not None:
            miembro_asignado = connection.execute(
                """
                SELECT id
                FROM miembros_grupo
                WHERE grupo_id = ?
                  AND usuario_id = ?
                """,
                (tarea["grupo_id"], asignado_usuario_id),
            ).fetchone()

            if miembro_asignado is None:
                raise TaskError(
                    code="usuario_asignado_no_valido",
                    message="El responsable debe pertenecer al grupo de la tarea.",
                    status_code=400,
                )

        connection.execute(
            """
            UPDATE tareas
               SET titulo = ?,
                   descripcion = ?,
                   fecha = ?,
                   hora_inicio = ?,
                   hora_fin = ?,
                   asignado_usuario_id = ?,
                   localizacion = ?,
                   recordatorio_minutos = ?
             WHERE id = ?
            """,
            (
                titulo_normalizado,
                descripcion_normalizada,
                fecha_normalizada,
                inicio_normalizado,
                fin_normalizado,
                asignado_usuario_id,
                localizacion_normalizada,
                recordatorio_normalizado,
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
                t.fecha_finalizacion,
                t.asignado_usuario_id,
                asignado.nombre AS asignado_nombre,
                asignado.email AS asignado_email,
                t.localizacion,
                t.recordatorio_minutos,
                t.estado,
                mg.rol AS rol_grupo
            FROM tareas t
            INNER JOIN grupos g ON g.id = t.grupo_id
            INNER JOIN miembros_grupo mg
                ON mg.grupo_id = t.grupo_id
               AND mg.usuario_id = ?
            LEFT JOIN usuarios asignado ON asignado.id = t.asignado_usuario_id
            WHERE t.id = ?
            """,
            (usuario.id, tarea_id),
        ).fetchone()

        return tarea_row_to_response_con_conflictos(connection, row)


def marcar_tarea_completada(usuario: Usuario, tarea_id: int) -> dict:
    fecha_finalizacion = date.today().isoformat()

    with get_connection() as connection:
        tarea = connection.execute(
            """
            SELECT
                t.id,
                t.estado
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

        if tarea["estado"] == "Finalizada":
            raise TaskError(
                code="tarea_ya_finalizada",
                message="La tarea ya esta finalizada.",
                status_code=409,
            )

        if tarea["estado"] == "Cancelada":
            raise TaskError(
                code="tarea_no_completable",
                message="No se puede completar una tarea cancelada.",
                status_code=409,
            )

        connection.execute(
            """
            UPDATE tareas
               SET estado = 'Finalizada',
                   fecha_finalizacion = ?
             WHERE id = ?
            """,
            (fecha_finalizacion, tarea_id),
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
                t.fecha_finalizacion,
                t.asignado_usuario_id,
                asignado.nombre AS asignado_nombre,
                asignado.email AS asignado_email,
                t.localizacion,
                t.recordatorio_minutos,
                t.estado,
                mg.rol AS rol_grupo
            FROM tareas t
            INNER JOIN grupos g ON g.id = t.grupo_id
            INNER JOIN miembros_grupo mg
                ON mg.grupo_id = t.grupo_id
               AND mg.usuario_id = ?
            LEFT JOIN usuarios asignado ON asignado.id = t.asignado_usuario_id
            WHERE t.id = ?
            """,
            (usuario.id, tarea_id),
        ).fetchone()

        return tarea_row_to_response_con_conflictos(connection, row)


def eliminar_tarea(usuario: Usuario, tarea_id: int) -> int:
    with get_connection() as connection:
        tarea = connection.execute(
            """
            SELECT
                t.id,
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
                message="No tienes permisos para eliminar esta tarea.",
                status_code=403,
            )

        connection.execute("DELETE FROM tareas WHERE id = ?", (tarea_id,))

    return tarea_id
