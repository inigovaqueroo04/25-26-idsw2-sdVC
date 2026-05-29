# editarInvitacion()

## Objetivo

Permitir que un miembro consulte una invitacion concreta y cambie su estado
aceptandola o rechazandola. El caso completa la gestion iniciada desde la lista
de invitaciones y deja registrada la decision del usuario.

## Actor principal

`Miembro`.

SdR situa este caso en el flujo operativo del miembro, ya que la accion consiste
en validar una invitacion recibida o asociada al propio usuario.

## Precondiciones

- El usuario ha iniciado sesion.
- El sistema esta en `INVITACIONES_ABIERTO` o `INVITACION_ABIERTO`.
- Existe una invitacion seleccionada.
- La invitacion pertenece o esta dirigida al miembro que intenta gestionarla.
- La invitacion se encuentra en un estado que permite decision, preferiblemente
  `Pendiente`.

## Flujo principal

1. El miembro solicita editar una invitacion desde la lista o desde el detalle.
2. El sistema muestra los datos actuales de la invitacion.
3. El sistema permite cambiar el estado a aceptar o rechazar.
4. El miembro selecciona la decision correspondiente.
5. El miembro solicita guardar los cambios.
6. El sistema registra el nuevo estado de la invitacion.
7. El sistema queda en `INVITACION_ABIERTO`.

## Flujos alternativos

- Usuario no autenticado: el sistema bloquea la gestion y solicita iniciar
  sesion.
- Invitacion inexistente: el sistema informa de que la invitacion ya no esta
  disponible y debe actualizar la lista.
- Falta de permisos: el sistema impide modificar una invitacion que no
  corresponde al miembro.
- Invitacion ya aceptada o rechazada: el sistema no deberia permitir volver a
  cambiar su decision si el estado ya es final.
- Invitacion cancelada o caducada: el sistema debe mostrarla como no editable.
- Fallo al guardar: se conserva el estado anterior y se informa del error.
- Cancelacion desde el detalle: no se aplican cambios y se mantiene
  `INVITACION_ABIERTO`.
- Cancelacion desde la lista: no se aplican cambios y se vuelve a
  `INVITACIONES_ABIERTO`.

## Postcondiciones

Si el caso termina correctamente, la invitacion queda actualizada como
`Aceptada` o `Rechazada` y el sistema mantiene visible el detalle en
`INVITACION_ABIERTO`. Si se cancela o falla el guardado, no cambia el estado de
la invitacion.

## Elementos relacionados en SdR

- Caso detallado `editarInvitacion()`: muestra la visualizacion de datos, el
  cambio de estado aceptar/rechazar, el guardado y la cancelacion.
- Diagrama de contexto de miembro: situa la entrada desde
  `INVITACIONES_ABIERTO` o `INVITACION_ABIERTO` y confirma que el resultado
  vuelve a `INVITACION_ABIERTO`.
- Diagrama de organizacion y grupos: asigna el caso al actor `Miembro`.
- Modelo de estados de invitacion: justifica que la decision normal parte de
  `Pendiente` y termina en `Aceptada` o `Rechazada`.
- Modelo de dominio de invitacion: vincula la invitacion con usuario y grupo,
  lo que justifica las comprobaciones de pertenencia y permisos.

No se ha usado `sdvc` como referencia principal. No hay implementacion directa
en codigo; el analisis se obtiene de los diagramas y documentacion del SdR.

## Observaciones

SdR permite cambiar el estado a aceptar o rechazar, pero no explicita si una
invitacion ya resuelta puede modificarse. Como criterio de diseno, solo las
invitaciones `Pendiente` deberian ser editables por el miembro; los estados
`Aceptada`, `Rechazada`, `Cancelada` y `Caducada` deberian tratarse como
finales.
