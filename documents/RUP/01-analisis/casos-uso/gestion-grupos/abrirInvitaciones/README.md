# abrirInvitaciones()

## Objetivo

Permitir que un miembro consulte sus invitaciones pendientes o registradas en
el sistema. El caso funciona como una vista de entrada a la gestión de
invitaciones, desde la que se puede filtrar la lista o abrir una invitación
concreta.

## Actor principal

`Miembro`.

Aunque `Administrador` y `Miembro Administrador` heredan capacidades generales,
SdR sitúa este caso en el actor `Miembro`, porque la acción principal es
consultar invitaciones recibidas o asociadas al propio usuario.

## Precondiciones

- El usuario ha iniciado sesión.
- El sistema está en `SISTEMA_DISPONIBLE` o ya se encuentra en
  `INVITACIONES_ABIERTO`.
- El usuario tiene invitaciones asociadas o el sistema puede mostrar una lista
  vacía.
- El sistema puede cargar el identificador y estado de cada invitación.

## Flujo principal

1. El miembro solicita abrir invitaciones.
2. El sistema carga las invitaciones asociadas al usuario.
3. El sistema muestra la lista con identificador y estado.
4. El miembro puede filtrar la lista.
5. El miembro selecciona una invitación si quiere verla o gestionarla.
6. El sistema permite pasar a `editarInvitacion()` o volver al menú mediante
   `completarGestion()`.

## Flujos alternativos

- Usuario no autenticado: el sistema no muestra invitaciones y debe pedir
  autenticación.
- Fallo al cargar invitaciones: el sistema informa del error y evita mostrar
  una lista incompleta como válida.
- Sin invitaciones: el sistema muestra la lista vacía y mantiene el estado
  `INVITACIONES_ABIERTO`.
- Filtro sin resultados: el sistema muestra la lista filtrada vacía y permite
  cambiar el filtro.
- Invitación no disponible: si una invitación desaparece o cambia de estado, el
  sistema debe actualizar la lista antes de continuar.

## Postcondiciones

El sistema queda en `INVITACIONES_ABIERTO` con la lista de invitaciones visible,
completa o filtrada. Desde ahí el miembro puede abrir una invitación concreta o
volver a `SISTEMA_DISPONIBLE`.

## Elementos relacionados en SdR

- Caso detallado `abrirInvitaciones()`: define la visualización de la lista, el
  filtrado y las salidas hacia `editarInvitacion()` o `completarGestion()`.
- Diagrama de organización y grupos: asigna el caso al actor `Miembro`.
- Diagrama de contexto de miembro: sitúa el estado `INVITACIONES_ABIERTO` y sus
  transiciones principales.
- Modelo de dominio de invitación: justifica que una invitación se relaciona
  con un usuario y un grupo, y que puede tener distintos estados.

No se ha usado `sdvc` como referencia principal. No hay implementación directa
en código; el análisis se obtiene de los diagramas y documentación del SdR.

## Observaciones

SdR define varios estados de invitación, pero no concreta cuáles deben aparecer
por defecto en la lista. Como criterio de diseño, la vista principal debería
mostrar primero las invitaciones `Pendiente`, porque son las que requieren una
acción del miembro; los estados `Aceptada`, `Rechazada`, `Cancelada` y
`Caducada` deberían quedar disponibles mediante filtro o historial.
