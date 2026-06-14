# editarGrupo()

## Objetivo

Permitir modificar los datos de un grupo existente desde distintas zonas del
sistema. El caso muestra la informacion actual del grupo, permite cambiar sus
campos y guarda los cambios manteniendo el foco en el grupo editado.

## Actor principal

`Miembro Administrador` o `Administrador`. El diagrama de organizacion asocia
`editarGrupo()` al `Miembro Administrador`, y el detalle del caso muestra al
`Administrador` ejecutando la accion.

## Precondiciones

- El usuario ha iniciado sesion.
- El usuario tiene permisos para modificar grupos.
- Existe un grupo seleccionado.
- El sistema esta en un contexto desde el que se puede editar el grupo:
  `GRUPOS_ABIERTO`, `GRUPO_ABIERTO`, `TAREAS_ABIERTO` o `MIEMBRO_ABIERTO`.
- El sistema puede cargar los datos actuales del grupo.

## Flujo principal

1. El usuario solicita editar un grupo.
2. El sistema muestra los datos actuales del grupo.
3. El usuario modifica los campos necesarios.
4. El usuario solicita guardar y salir.
5. El sistema valida y guarda los cambios.
6. El sistema queda en `GRUPO_ABIERTO`.

## Flujos alternativos

- Usuario no autenticado: el sistema no debe permitir la edicion y debe
  mantener o redirigir a `SESION_CERRADA`.
- Falta de permisos: el sistema impide modificar el grupo.
- Grupo inexistente o no seleccionado: el sistema informa del problema y no
  abre la edicion.
- Datos invalidos: el sistema muestra el error y permite corregir los campos.
- Fallo al guardar: el sistema informa del error y conserva los datos previos.
- Cancelacion: el usuario cancela la edicion y el sistema vuelve a
  `GRUPO_ABIERTO` sin aplicar cambios.

## Postcondiciones

Si el proceso termina correctamente, los datos del grupo quedan actualizados y
el sistema queda en `GRUPO_ABIERTO`. Si se cancela o falla el guardado, no deben
aplicarse cambios al grupo.

## Elementos relacionados en SdR

- `documents/actoresYCasosDeUso/README.md`: enumera `editarGrupo()` dentro de
  gestion de grupos y usuarios, y describe que `Administrador` y `Miembro
  Administrador` pueden modificar elementos del grupo.
- `documents/actoresYCasosDeUso/detalladoYPrototipado/gestionDeGruposYUsuarios/README.md`:
  agrupa `editarGrupo()` con los casos de uso de grupos.
- `documents/actoresYCasosDeUso/detalladoYPrototipado/gestionDeGruposYUsuarios/editarGrupo/editarGrupo.md`:
  presenta el caso de uso y enlaza su diagrama.
- `documents/actoresYCasosDeUso/detalladoYPrototipado/gestionDeGruposYUsuarios/editarGrupo/editarGrupo.puml`:
  define las entradas desde `GRUPOS_ABIERTO`, `GRUPO_ABIERTO`, `TAREAS_ABIERTO`
  y `MIEMBRO_ABIERTO`, la visualizacion de datos actuales, la modificacion de
  campos, el guardado y la cancelacion.
- `documents/actoresYCasosDeUso/detalladoYPrototipado/gestionDeGruposYUsuarios/editarGrupo/editarGrupo.svg`:
  version visual del flujo.
- `documents/actoresYCasosDeUso/detalladoYPrototipado/gestionDeGruposYUsuarios/editarGrupo/editarGrupoPrototipado.svg`:
  prototipo asociado a la pantalla de edicion.
- `documents/actoresYCasosDeUso/diagramas/diagramaOrganizacionYGrupos/diagramaOrganizacionYGrupos.puml`:
  relaciona `editarGrupo()` con el actor `Miembro Administrador`.
- `documents/actoresYCasosDeUso/diagramaContexto/diagramaContextoAdmin.puml`:
  muestra transiciones hacia `editarGrupo()` desde la lista de grupos, el grupo
  abierto, tareas y miembro abierto para el administrador.
- `documents/actoresYCasosDeUso/diagramaContexto/diagramaContextoMiembroAdmin.puml`:
  confirma que el miembro administrador tambien puede llegar a `editarGrupo()`.
- `documents/modelosUML/modeloDeDominio/diagramaClases/diagramaClases.md`:
  describe `Grupo`, `Usuario` y `Rol`, que justifican la edicion del grupo y
  sus permisos.

No se ha localizado una implementacion directa en codigo dentro de SdR; el caso
de uso se ha inferido a partir de la documentacion, diagramas de actividad,
prototipos, diagramas de contexto y modelo de dominio.

## Diagramas de análisis

### Colaboración

![Colaboración de análisis](./colaboracion.svg)

Código fuente: [colaboracion.puml](./colaboracion.puml)

### Secuencia

![Secuencia de análisis](./secuencia.svg)

Código fuente: [secuencia.puml](./secuencia.puml)

## Observaciones

SdR no detalla que campos concretos del grupo son editables ni que validaciones
se aplican al guardar. Tambien convendria alinear el actor mostrado en el
detalle con el diagrama general, porque uno usa `Administrador` y el otro
`Miembro Administrador`.
