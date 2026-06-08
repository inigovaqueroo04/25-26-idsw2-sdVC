from dataclasses import dataclass
from sqlite3 import Row


@dataclass(frozen=True)
class Usuario:
    id: int
    nombre: str
    email: str
    rol: str

    @classmethod
    def from_row(cls, row: Row) -> "Usuario":
        return cls(
            id=row["id"],
            nombre=row["nombre"],
            email=row["email"],
            rol=row["rol"],
        )

    def to_response(self) -> dict:
        return {
            "id": self.id,
            "nombre": self.nombre,
            "email": self.email,
            "rol": self.rol,
        }

