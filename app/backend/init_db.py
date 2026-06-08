from database import DATABASE_PATH, init_db


if __name__ == "__main__":
    init_db()
    print(f"Base de datos inicializada en {DATABASE_PATH}")

