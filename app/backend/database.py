from collections.abc import Iterator
from contextlib import contextmanager
from pathlib import Path
import sqlite3


BASE_DIR = Path(__file__).resolve().parent.parent
DATABASE_DIR = BASE_DIR / "database"
DATABASE_PATH = DATABASE_DIR / "brenotask.sqlite3"
SCHEMA_PATH = DATABASE_DIR / "schema.sql"
SEED_PATH = DATABASE_DIR / "seed.sql"


TASK_COLUMNS = {
    "fecha": "TEXT",
    "hora_inicio": "TEXT",
    "hora_fin": "TEXT",
    "fecha_finalizacion": "TEXT",
    "asignado_usuario_id": "INTEGER",
    "localizacion": "TEXT",
    "recordatorio_minutos": "INTEGER",
}


@contextmanager
def get_connection() -> Iterator[sqlite3.Connection]:
    connection = sqlite3.connect(DATABASE_PATH)
    connection.row_factory = sqlite3.Row
    try:
        yield connection
        connection.commit()
    except Exception:
        connection.rollback()
        raise
    finally:
        connection.close()


def init_db() -> None:
    DATABASE_DIR.mkdir(parents=True, exist_ok=True)

    with get_connection() as connection:
        connection.executescript(SCHEMA_PATH.read_text(encoding="utf-8"))
        migrate_tasks_table(connection)
        ensure_task_relations_table(connection)
        connection.executescript(SEED_PATH.read_text(encoding="utf-8"))


def migrate_tasks_table(connection: sqlite3.Connection) -> None:
    table = connection.execute(
        """
        SELECT name
        FROM sqlite_master
        WHERE type = 'table'
          AND name = 'tareas'
        """
    ).fetchone()

    if table is None:
        return

    existing_columns = {
        row["name"]
        for row in connection.execute("PRAGMA table_info(tareas)").fetchall()
    }

    for column_name, column_type in TASK_COLUMNS.items():
        if column_name not in existing_columns:
            connection.execute(f"ALTER TABLE tareas ADD COLUMN {column_name} {column_type}")


def ensure_task_relations_table(connection: sqlite3.Connection) -> None:
    connection.execute(
        """
        CREATE TABLE IF NOT EXISTS relaciones_tareas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            tarea_origen_id INTEGER NOT NULL,
            tarea_destino_id INTEGER NOT NULL,
            tipo TEXT NOT NULL CHECK (tipo IN ('predecesora')),
            creado_en TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (tarea_origen_id) REFERENCES tareas(id),
            FOREIGN KEY (tarea_destino_id) REFERENCES tareas(id),
            UNIQUE (tarea_origen_id, tipo)
        )
        """
    )
    connection.execute(
        """
        CREATE INDEX IF NOT EXISTS idx_relaciones_tareas_origen
        ON relaciones_tareas(tarea_origen_id)
        """
    )
    connection.execute(
        """
        CREATE INDEX IF NOT EXISTS idx_relaciones_tareas_destino
        ON relaciones_tareas(tarea_destino_id)
        """
    )
