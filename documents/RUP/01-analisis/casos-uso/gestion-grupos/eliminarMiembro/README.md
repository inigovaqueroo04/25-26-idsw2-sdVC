# eliminarMiembro()

## Objetivo
Permite retirar a un usuario de un grupo desde la vista de un miembro concreto. El caso de uso sirve para mantener la composicion del grupo actualizada cuando un miembro ya no debe participar en el grupo o conservar permisos dentro de el.

## Actor principal
Miembro Administrador o Administrador.

## Precondiciones
- El usuario ha iniciado sesion.
- Existe un grupo abierto al que pertenece el miembro.
- Existe un miembro seleccionado en estado `MIEMBRO_ABIERTO`.
- El actor tiene permisos para gestionar miembros del grupo.
- La eliminacion no incumple reglas de administracion del grupo.

## Flujo principal
1. El actor solicita eliminar el miembro seleccionado.
2. El sistema presenta una solicitud de confirmacion.
3. El actor confirma la eliminacion.
4. El sistema valida permisos y restricciones del grupo.
5. El sistema elimina la pertenencia del miembro al grupo.
6. El sistema actualiza la vista de gestion de miembros.

## Flujos alternativos
- Usuario no autenticado: el sistema bloquea la operacion y solicita iniciar sesion.
- Grupo inexistente o no disponible: no se puede completar la eliminacion porque falta el contexto del grupo.
- Miembro inexistente: el sistema informa de que el miembro ya no esta disponible o no pertenece al grupo.
- Falta de permisos: el actor no puede eliminar miembros del grupo.
- Intento de eliminar al ultimo administrador: el sistema debe impedir la operacion para no dejar el grupo sin gestion.
- Cancelacion de la eliminacion: no se aplica ningun cambio y se mantiene la vista del miembro.
- Fallo al guardar los cambios: se conserva la pertenencia anterior del miembro y se informa del error.

## Postcondiciones
Si el caso termina correctamente, el miembro deja de pertenecer al grupo y la gestion de miembros queda actualizada. Si se cancela o falla la operacion, no se modifica la composicion del grupo.

## Elementos relacionados en SdR
- `documents/actoresYCasosDeUso/detalladoYPrototipado/gestionDeGruposYUsuarios/eliminarMiembro/eliminarMiembro.md`
- `documents/actoresYCasosDeUso/detalladoYPrototipado/gestionDeGruposYUsuarios/eliminarMiembro/eliminarMiembro.puml`
- `documents/actoresYCasosDeUso/diagramaContexto/diagramaContextoAdmin.puml`
- `documents/actoresYCasosDeUso/diagramaContexto/diagramaContextoMiembroAdmin.puml`
- `documents/actoresYCasosDeUso/diagramaContexto/README.md`
- `documents/actoresYCasosDeUso/diagramas/diagramaOrganizacionYGrupos/diagramaOrganizacionYGrupos.puml`
- `documents/modelosUML/modeloDeDominio/diagramaObjetos/diagramaObjetosRol.puml`
- `documents/modelosUML/modeloDeDominio/diagramaClases/diagramaClases.md`

No se ha usado el repositorio `sdvc` como referencia principal. No se ha localizado una implementacion directa en codigo, por lo que el analisis se ha inferido a partir de diagramas de actividad, diagramas de contexto, descripcion de roles y modelo de dominio del repositorio SdR.

## Observaciones
El PUML deja ambigua la vista final tras confirmar. Para diseño prevalece el
resultado funcional: tras retirar la pertenencia se volverá a
`GRUPO_ABIERTO`, porque `MIEMBRO_ABIERTO` ya no representa un elemento válido.
