# invitarUsuario()

## Objetivo

Permitir que un usuario con permisos invite a otra persona a incorporarse a un
grupo existente. El caso recoge el identificador del usuario invitado y una
fecha asociada a la invitacion, y mantiene la gestion dentro del grupo abierto.

## Actor principal

`Miembro Administrador` o `Administrador`. El diagrama general asocia
`invitarUsuario()` al `Miembro Administrador`, y los diagramas de contexto
permiten la misma accion desde `GRUPO_ABIERTO` para ambos perfiles.

## Precondiciones

- El usuario ha iniciado sesion.
- El sistema esta en `GRUPO_ABIERTO`.
- El usuario tiene permisos para gestionar miembros del grupo.
- Existe un grupo seleccionado.
- El usuario a invitar puede identificarse mediante el dato solicitado por el
  sistema.

## Flujo principal

1. El usuario solicita invitar a un usuario al grupo.
2. El sistema presenta el formulario de invitacion.
3. El usuario introduce el identificador del invitado y la fecha.
4. El usuario solicita enviar la invitacion.
5. El sistema registra o envia la invitacion.
6. El sistema vuelve a `GRUPO_ABIERTO`.

## Flujos alternativos

- Usuario no autenticado: el sistema no debe permitir enviar la invitacion y
  debe mantener o redirigir a `SESION_CERRADA`.
- Falta de permisos: el sistema impide invitar usuarios al grupo.
- Grupo inexistente o no seleccionado: el sistema informa del problema y no
  crea la invitacion.
- Identificador vacio o invalido: el sistema solicita corregir el dato antes de
  enviar.
- Usuario ya invitado: el sistema evita duplicar la invitacion pendiente.
- Usuario ya miembro: el sistema informa de que no hace falta invitarlo.
- Fallo al enviar o registrar: el sistema informa del error y no debe considerar
  la invitacion como enviada.
- Cancelacion: el usuario cancela la invitacion y el sistema vuelve a
  `GRUPO_ABIERTO`.

## Postcondiciones

Si el proceso termina correctamente, queda registrada o enviada una invitacion
para que el usuario indicado pueda unirse al grupo. Si se cancela o falla, no se
crea una invitacion nueva y el sistema permanece en `GRUPO_ABIERTO`.

## Elementos relacionados en SdR

- `documents/actoresYCasosDeUso/README.md`: enumera `invitarUsuario()` dentro
  de gestion de grupos y usuarios.
- `documents/actoresYCasosDeUso/detalladoYPrototipado/gestionDeGruposYUsuarios/README.md`:
  agrupa `invitarUsuario()` con los casos de uso de grupos y miembros.
- `documents/actoresYCasosDeUso/detalladoYPrototipado/gestionDeGruposYUsuarios/invitarUsuario/invitarUsuario.md`:
  presenta el caso de uso y enlaza su diagrama.
- `documents/actoresYCasosDeUso/detalladoYPrototipado/gestionDeGruposYUsuarios/invitarUsuario/invitarUsuario.puml`:
  define el flujo desde `GRUPO_ABIERTO`, el formulario de invitacion, los datos
  solicitados, el envio y la cancelacion.
- `documents/actoresYCasosDeUso/detalladoYPrototipado/gestionDeGruposYUsuarios/invitarUsuario/invitarUsuario.svg`:
  version visual del flujo.
- `documents/actoresYCasosDeUso/detalladoYPrototipado/gestionDeGruposYUsuarios/invitarUsuario/invitarUsuarioPrototipado.svg`:
  prototipo asociado a la invitacion.
- `documents/actoresYCasosDeUso/diagramas/diagramaOrganizacionYGrupos/diagramaOrganizacionYGrupos.puml`:
  relaciona `invitarUsuario()` con el actor `Miembro Administrador`.
- `documents/actoresYCasosDeUso/diagramaContexto/diagramaContextoAdmin.puml`:
  muestra `invitarUsuario()` como accion desde `GRUPO_ABIERTO`.
- `documents/actoresYCasosDeUso/diagramaContexto/diagramaContextoMiembroAdmin.puml`:
  confirma la misma accion para el miembro administrador desde `GRUPO_ABIERTO`.
- `documents/modelosUML/modeloDeDominio/diagramaObjetos/diagramaObjetosInvitacion.puml`:
  modela una invitacion asociada a un grupo y enviada por un usuario.
- `documents/modelosUML/modeloDeDominio/diagramaClases/diagramaClases.md`:
  describe `Grupo`, `Usuario` y `Rol`, necesarios para entender el grupo, el
  invitado y los permisos.

No se ha localizado una implementacion directa en codigo dentro de SdR; el caso
de uso se ha inferido a partir de la documentacion, diagramas de actividad,
prototipos, diagramas de contexto y modelo de dominio.

## Observaciones

SdR indica que se introduce un identificador y una fecha, pero no concreta si el
identificador es email, nombre de usuario u otro dato. Tampoco define si la
fecha representa caducidad, fecha de envio o fecha prevista de incorporacion.
