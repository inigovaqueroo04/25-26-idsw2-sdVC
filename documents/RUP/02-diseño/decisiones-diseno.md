# Decisiones de diseño

## Decisiones globales

- El diseño se mantiene conceptual y no fija tecnología concreta.
- Cada caso de uso se modela con interfaz, coordinador, servicios, dominio, repositorio conceptual y estado de aplicación.
- La persistencia se documenta como concepto hasta iniciar implementación.
- Las cancelaciones y errores no deben aplicar cambios no validados.
- Los roles se evalúan dentro del grupo mediante la entidad Miembro.

## Sesión y navegación

- iniciarSesion() abre estado operativo de usuario.
- cerrarSesion() limpia el estado de sesión sin modificar entidades de dominio.
- completarGestion() estabiliza la navegación desde estados secundarios.

## Grupos y miembros

- Todo usuario autenticado puede consultar grupos propios.
- La administración de grupos depende del rol del miembro dentro de cada grupo.
- Crear grupo implica crear la primera pertenencia administrativa.
- Eliminar miembro no elimina el usuario global.
- Las invitaciones permanecen separadas de la pertenencia hasta su aceptación.

## Invitaciones

- Solo invitaciones pendientes pueden aceptarse o rechazarse.
- Aceptar una invitación crea la relación de miembro con el grupo.
- Rechazar una invitación solo cambia su estado.
- Invitaciones duplicadas o caducadas deben bloquearse conceptualmente.

## Tareas

- Una tarea pertenece a un grupo.
- El horario se modela como valor asociado a la tarea.
- Las relaciones entre tareas distinguen jerarquía y precedencia.
- Eliminar una tarea limpia relaciones auxiliares afectadas.
- Marcar completada cambia estado, no elimina la tarea.

## Planificación

- La planificación es una vista global filtrable por grupo o fecha.
- Cambios de horario pueden disparar validación de conflictos.
- La localización se mantiene como descripción textual en este diseño.
- Los recordatorios se asocian a tareas y dependen de un horario de referencia.

## Validación de conflictos

- Los conflictos se derivan de horarios y asignaciones.
- Se registran como avisos idempotentes.
- No bloquean por defecto la creación o edición de tareas, salvo decisión futura.

## Decisiones trasladadas a implementación

- Interfaz implementada con React y Vite.
- Backend implementado con FastAPI.
- Almacenamiento implementado con SQLite.
- Datos iniciales definidos en `app/database/seed.sql`.
