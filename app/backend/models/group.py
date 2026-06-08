from dataclasses import dataclass
from sqlite3 import Row


@dataclass(frozen=True)
class GrupoResumen:
    id: int
    nombre: str
    descripcion: str | None
    rol: str
    numero_miembros: int

    @classmethod
    def from_row(cls, row: Row) -> "GrupoResumen":
        return cls(
            id=row["id"],
            nombre=row["nombre"],
            descripcion=row["descripcion"],
            rol=row["rol"],
            numero_miembros=row["numero_miembros"],
        )

    def to_response(self) -> dict:
        return {
            "id": self.id,
            "nombre": self.nombre,
            "descripcion": self.descripcion,
            "rol": self.rol,
            "numero_miembros": self.numero_miembros,
        }

