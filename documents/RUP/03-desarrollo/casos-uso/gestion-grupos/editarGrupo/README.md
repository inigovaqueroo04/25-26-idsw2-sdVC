# editarGrupo > Desarrollo

## Estado

Implementado como tercer incremento vertical del modulo de Gestion de grupos y
usuarios.

## Trazabilidad

- Analisis: `documents/RUP/01-analisis/casos-uso/gestion-grupos/editarGrupo/README.md`
- Diseno: `documents/RUP/02-diseño/casos-uso/gestion-grupos/editarGrupo/README.md`
- Codigo: `app/`

## Archivos de codigo asociados

- `app/backend/routes/groups.py`: expone `PUT /api/groups/{group_id}`.
- `app/backend/services/group_service.py`: valida disponibilidad del grupo,
  permisos de gestion, nombre obligatorio y duplicidad por usuario.
- `app/backend/schemas/groups.py`: define entrada y respuesta del caso de uso.
- `app/backend/database.py`: aplica rollback ante errores dentro de una
  operacion SQLite.
- `app/frontend/src/api/groups.js`: encapsula la llamada `updateGroup`.
- `app/frontend/src/App.jsx`: muestra la edicion inline por tarjeta y actualiza
  la lista.
- `app/frontend/src/App.css`: estilos de acciones y formulario de edicion.

## Decision de implementacion

La edicion se limita a nombre y descripcion, porque son los datos concretos ya
materializados en el modelo persistente de grupos. El usuario debe pertenecer al
grupo con rol `Administrador` o `Miembro Administrador`; asi se mantiene la
lectura del analisis, que permite actuar tanto al administrador como al miembro
administrador.

La respuesta mantiene `GRUPO_ABIERTO`, preserva el identificador del grupo y
devuelve el resumen actualizado para refrescar la tarjeta sin recargar la
aplicacion.

## Endpoint

```http
PUT /api/groups/{group_id}
X-Session-Token: <token>
Content-Type: application/json
```

```json
{
  "nombre": "Grupo actualizado",
  "descripcion": "Nueva descripcion opcional"
}
```

Respuesta correcta:

```json
{
  "estado": "GRUPO_ABIERTO",
  "mensaje": "Grupo actualizado correctamente.",
  "grupo": {
    "id": 1,
    "nombre": "Grupo actualizado",
    "descripcion": "Nueva descripcion opcional",
    "rol": "Administrador",
    "numero_miembros": 1
  }
}
```

## Alcance no incluido

- Edicion de miembros o roles.
- Eliminacion del grupo.
- Invitaciones.
- Pantalla detallada independiente de grupo.
- Pruebas automatizadas.
