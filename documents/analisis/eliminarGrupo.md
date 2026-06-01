# eliminarGrupo()

## Objetivo

Permitir que el `Administrador` elimine un grupo existente desde la gestion de
grupos. El caso pide confirmacion antes de borrar para evitar eliminaciones
accidentales y mantiene al usuario en la lista de grupos al terminar.

## Actor principal

`Administrador`.

## Precondiciones

- El usuario ha iniciado sesion.
- El sistema esta en `GRUPOS_ABIERTO`.
- El usuario tiene rol de `Administrador`.
- Existe un grupo seleccionado o identificable para eliminar.
- El sistema puede mostrar una confirmacion antes de borrar.

## Flujo principal

1. El administrador solicita eliminar un grupo.
2. El sistema muestra una solicitud de confirmacion.
3. El administrador confirma la eliminacion.
4. El sistema borra el grupo.
5. El sistema vuelve a `GRUPOS_ABIERTO`.

## Flujos alternativos

- Usuario no autenticado: el sistema no debe permitir la eliminacion y debe
  mantener o redirigir a `SESION_CERRADA`.
- Falta de permisos: el sistema impide borrar el grupo porque la accion queda
  reservada al `Administrador`.
- Grupo inexistente o no seleccionado: el sistema informa del problema y no
  ejecuta la eliminacion.
- Cancelacion: el administrador cancela la eliminacion y el sistema vuelve a
  `GRUPOS_ABIERTO` sin borrar nada.
- Fallo al borrar: el sistema informa del error y conserva el grupo.

## Postcondiciones

Si el proceso termina correctamente, el grupo queda eliminado y deja de aparecer
en la gestion de grupos. Si se cancela o falla, el grupo se conserva y el
sistema permanece en `GRUPOS_ABIERTO`.

## Elementos relacionados en SdR

- `documents/actoresYCasosDeUso/README.md`: enumera `eliminarGrupo()` dentro de
  gestion de grupos y usuarios, y diferencia los permisos de `Administrador` y
  `Miembro Administrador`.
- `documents/actoresYCasosDeUso/detalladoYPrototipado/gestionDeGruposYUsuarios/README.md`:
  agrupa `eliminarGrupo()` con los casos de uso de grupos.
- `documents/actoresYCasosDeUso/detalladoYPrototipado/gestionDeGruposYUsuarios/eliminarGrupo/eliminarGrupo.md`:
  presenta el caso de uso y enlaza su diagrama.
- `documents/actoresYCasosDeUso/detalladoYPrototipado/gestionDeGruposYUsuarios/eliminarGrupo/eliminarGrupo.puml`:
  define el flujo desde `GRUPOS_ABIERTO`, la confirmacion, la confirmacion de
  eliminacion y la cancelacion.
- `documents/actoresYCasosDeUso/detalladoYPrototipado/gestionDeGruposYUsuarios/eliminarGrupo/eliminarGrupo.svg`:
  version visual del flujo.
- `documents/actoresYCasosDeUso/detalladoYPrototipado/gestionDeGruposYUsuarios/eliminarGrupo/eliminarGrupoPrototipado.svg`:
  prototipo asociado a la eliminacion.
- `documents/actoresYCasosDeUso/diagramas/diagramaOrganizacionYGrupos/diagramaOrganizacionYGrupos.puml`:
  relaciona `eliminarGrupo()` con el actor `Administrador`.
- `documents/actoresYCasosDeUso/diagramaContexto/diagramaContextoAdmin.puml`:
  muestra `eliminarGrupo()` como transicion autorreflexiva de `GRUPOS_ABIERTO`
  a `GRUPOS_ABIERTO`.
- `documents/actoresYCasosDeUso/diagramaContexto/README.md`:
  indica que la eliminacion de grupos pertenece al flujo de administrador y que
  el miembro administrador no tiene creacion ni eliminacion de grupos.
- `documents/modelosUML/modeloDeDominio/diagramaClases/diagramaClases.md`:
  describe `Grupo`, `Usuario` y `Rol`, necesarios para entender la entidad
  eliminada y el control de permisos.

No se ha localizado una implementacion directa en codigo dentro de SdR; el caso
de uso se ha inferido a partir de la documentacion, diagramas de actividad,
prototipos, diagramas de contexto y modelo de dominio.

## Observaciones

SdR no concreta qué ocurre con los datos asociados. Para el primer diseño, la
eliminación se bloqueará mientras existan tareas. Si no las hay, la operación
confirmada retirará pertenencias y cancelará invitaciones pendientes.
