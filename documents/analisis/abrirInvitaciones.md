# abrirInvitaciones()

## Objetivo

Permitir que un miembro consulte sus invitaciones pendientes o registradas en
el sistema. El caso funciona como una vista de entrada a la gestion de
invitaciones, desde la que se puede filtrar la lista o abrir una invitacion
concreta.

## Actor principal

`Miembro`.

Aunque `Administrador` y `Miembro Administrador` heredan capacidades generales,
SdR situa este caso en el actor `Miembro`, porque la accion principal es
consultar invitaciones recibidas o asociadas al propio usuario.

## Precondiciones

- El usuario ha iniciado sesion.
- El sistema esta en `SISTEMA_DISPONIBLE` o ya se encuentra en
  `INVITACIONES_ABIERTO`.
- El usuario tiene invitaciones asociadas o el sistema puede mostrar una lista
  vacia.
- El sistema puede cargar el identificador y estado de cada invitacion.

## Flujo principal

1. El miembro solicita abrir invitaciones.
2. El sistema carga las invitaciones asociadas al usuario.
3. El sistema muestra la lista con identificador y estado.
4. El miembro puede filtrar la lista.
5. El miembro selecciona una invitacion si quiere verla o gestionarla.
6. El sistema permite pasar a `editarInvitacion()` o volver al menu mediante
   `completarGestion()`.

## Flujos alternativos

- Usuario no autenticado: el sistema no muestra invitaciones y debe pedir
  autenticacion.
- Fallo al cargar invitaciones: el sistema informa del error y evita mostrar
  una lista incompleta como valida.
- Sin invitaciones: el sistema muestra la lista vacia y mantiene el estado
  `INVITACIONES_ABIERTO`.
- Filtro sin resultados: el sistema muestra la lista filtrada vacia y permite
  cambiar el filtro.
- Invitacion no disponible: si una invitacion desaparece o cambia de estado, el
  sistema debe actualizar la lista antes de continuar.

## Postcondiciones

El sistema queda en `INVITACIONES_ABIERTO` con la lista de invitaciones visible,
completa o filtrada. Desde ahi el miembro puede abrir una invitacion concreta o
volver a `SISTEMA_DISPONIBLE`.

## Elementos relacionados en SdR

- Caso detallado `abrirInvitaciones()`: define la visualizacion de la lista, el
  filtrado y las salidas hacia `editarInvitacion()` o `completarGestion()`.
- Diagrama de organizacion y grupos: asigna el caso al actor `Miembro`.
- Diagrama de contexto de miembro: situa el estado `INVITACIONES_ABIERTO` y sus
  transiciones principales.
- Modelo de dominio de invitacion: justifica que una invitacion se relaciona
  con un usuario y un grupo, y que puede tener distintos estados.

No se ha usado `sdvc` como referencia principal. No hay implementacion directa
en codigo; el analisis se obtiene de los diagramas y documentacion del SdR.

## Observaciones

SdR define varios estados de invitacion, pero no concreta cuales deben aparecer
por defecto en la lista. Como criterio de diseno, la vista principal deberia
mostrar primero las invitaciones `Pendiente`, porque son las que requieren una
accion del miembro; los estados `Aceptada`, `Rechazada`, `Cancelada` y
`Caducada` deberian quedar disponibles mediante filtro o historial.
