# Frontend BreñoTask

Aplicacion React + Vite para las primeras iteraciones verticales de BreñoTask.

## Instalacion y ejecucion

```powershell
cd app/frontend
npm install
npm run dev
```

Por defecto se conecta con `http://localhost:8000/api`. Para cambiarlo:

```powershell
$env:VITE_API_URL="http://localhost:8000/api"
npm run dev
```

## Flujo disponible

- Mostrar login si no hay sesion.
- Iniciar sesion con el usuario de prueba.
- Mostrar dashboard basico con estado de sesion activo.
- Mostrar el panel principal con estado de sesion activo.
- Mostrar la seccion `Mis grupos` con los grupos del usuario autenticado.
- Filtrar grupos por nombre desde el frontend.
- Mostrar la seccion `Mis tareas` con tareas de los grupos accesibles.
- Filtrar tareas por texto, grupo y estado.
- Mostrar una agenda filtrada con resumen de planificacion.
- Crear una tarea programada desde `Mis tareas` en grupos gestionables.
- Editar titulo, descripcion, fecha y horario de tareas gestionables desde `Mis tareas`.
- Configurar responsable, localizacion y recordatorio simple al editar una tarea.
- Indicar que una tarea depende de otra tarea activa del mismo grupo.
- Ver avisos de conflicto cuando una tarea se solapa con otra del mismo responsable.
- Eliminar tareas gestionables con confirmacion desde `Mis tareas`.
- Marcar tareas visibles como completadas desde `Mis tareas`.
- Crear un grupo nuevo desde el dashboard.
- Editar nombre y descripcion de un grupo propio desde su tarjeta.
- Eliminar un grupo propio con confirmacion desde su tarjeta.
- Registrar una invitacion pendiente desde la tarjeta de un grupo gestionable.
- Mostrar `Mis invitaciones` con invitaciones pendientes por defecto y filtro por estado.
- Aceptar o rechazar invitaciones pendientes recibidas desde `Mis invitaciones`.
- Cancelar invitaciones pendientes gestionables desde `Mis invitaciones`.
- Abrir `Miembros` en grupos gestionables y cambiar el rol de un miembro.
- Eliminar un miembro de un grupo gestionable con confirmacion.
- Cerrar sesion y volver a `SESION_CERRADA`.
