# crearGrupo > Desarrollo

## Estado

Implementado como segundo incremento vertical del modulo de Gestion de grupos y
usuarios.

## Trazabilidad

- Analisis: `documents/RUP/01-analisis/casos-uso/gestion-grupos/crearGrupo/README.md`
- Diseno: `documents/RUP/02-diseño/casos-uso/gestion-grupos/crearGrupo/README.md`
- Codigo: `app/`

## Archivos de codigo asociados

- `app/backend/routes/groups.py`: expone `POST /api/groups`.
- `app/backend/services/group_service.py`: valida permisos, nombre obligatorio
  y duplicidad por usuario; registra el grupo y la membresia inicial.
- `app/backend/schemas/groups.py`: define entrada y respuesta del caso de uso.
- `app/backend/database.py`: cierra las conexiones SQLite al terminar cada
  operacion.
- `app/frontend/src/api/groups.js`: encapsula la llamada `createGroup`.
- `app/frontend/src/api/auth.js`: conserva la fusion correcta de cabeceras en
  las llamadas API.
- `app/frontend/src/App.jsx`: muestra el formulario de creacion y actualiza el
  dashboard.
- `app/frontend/src/App.css`: estilos del formulario y mensajes de resultado.

## Decision de implementacion

La creacion se limita al usuario autenticado con rol global `Administrador`.
Cuando el grupo se guarda correctamente, el sistema crea tambien la relacion en
`miembros_grupo` con rol `Administrador`, manteniendo la decision de diseno de
vincular al creador como miembro administrador desde el primer momento.

La duplicidad se comprueba por usuario autenticado y nombre normalizado, porque
el analisis solo exige evitar una duplicidad relevante para quien gestiona sus
grupos.

## Endpoint

```http
POST /api/groups
X-Session-Token: <token>
Content-Type: application/json
```

```json
{
  "nombre": "Nuevo grupo",
  "descripcion": "Descripcion opcional"
}
```

Respuesta correcta:

```json
{
  "estado": "GRUPO_ABIERTO",
  "mensaje": "Grupo creado correctamente.",
  "grupo": {
    "id": 3,
    "nombre": "Nuevo grupo",
    "descripcion": "Descripcion opcional",
    "rol": "Administrador",
    "numero_miembros": 1
  }
}
```

## Alcance no incluido

- Edicion o eliminacion de grupos.
- Invitaciones.
- Gestion de miembros.
- Apertura de una pantalla detallada de grupo.
- Pruebas automatizadas.
