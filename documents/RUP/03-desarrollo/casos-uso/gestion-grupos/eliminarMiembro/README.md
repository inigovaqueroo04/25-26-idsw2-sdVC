# eliminarMiembro() > Desarrollo

Implementado como incremento vertical posterior a `editarMiembro()`, usando el
panel de miembros ya disponible en los grupos gestionables.

## Alcance implementado

- Retirar la pertenencia de un usuario a un grupo desde la lista de miembros.
- Solicitar confirmacion antes de aplicar la eliminacion.
- Mantener la identidad global del usuario: solo se elimina el registro de
  `miembros_grupo`.
- Refrescar el contador y la lista de grupos despues de eliminar un miembro.
- Bloquear la operacion si el grupo quedaria sin ningun `Administrador` o
  `Miembro Administrador`.

## Backend

Archivos principales:

- `app/backend/routes/groups.py`
- `app/backend/services/group_service.py`
- `app/backend/schemas/groups.py`

Endpoint incorporado:

```http
DELETE /api/groups/{group_id}/members/{member_id}
```

La ruta valida sesion y delega en `eliminar_miembro()`. El servicio comprueba
que el grupo sea accesible para el usuario actual, que el usuario tenga rol de
gestion dentro del grupo, que el miembro exista en ese grupo y que la baja no
elimine el ultimo perfil con permisos de gestion.

## Frontend

Archivos principales:

- `app/frontend/src/api/groups.js`
- `app/frontend/src/App.jsx`
- `app/frontend/src/App.css`

El panel `Miembros` incorpora un boton `Eliminar` por fila. Al pulsarlo se
muestra una confirmacion inline en la propia fila del miembro; confirmar llama
a la API, retira la fila del panel, limpia el borrador de rol asociado y
refresca los grupos para actualizar el contador de miembros.

## Decisiones

- La operacion se modela como baja de una membresia, no como eliminacion del
  usuario.
- Se permite que un gestor elimine a otro gestor solo si queda al menos otra
  persona con permisos de gestion.
- La confirmacion queda dentro de la fila para que el usuario vea con claridad
  que miembro esta a punto de retirar.
- No se reasignan automaticamente tareas asociadas. Si un miembro retirado era
  responsable de tareas, esa regularizacion queda para una mejora posterior de
  administracion de asignaciones.

## Estado resultante

`eliminarMiembro()` queda implementado en backend y frontend, enlazado con la
vista `GRUPO_ABIERTO` y consistente con el analisis y el diseno previos.
