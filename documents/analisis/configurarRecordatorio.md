# configurarRecordatorio()

## Objetivo

Permitir que un perfil administrador configure o actualice un recordatorio
asociado a una tarea. El aviso se define mediante un tipo de recordatorio y una
antelación respecto al horario de la tarea.

## Actor principal

El actor principal es `Miembro Administrador`. El perfil `Administrador`
también puede realizar la operación por herencia de permisos.

## Precondiciones

- El usuario ha iniciado sesión.
- La planificación está abierta en `PLANIFICACION_ABIERTO`.
- El usuario tiene permisos de gestión sobre la tarea.
- La tarea existe y dispone de un horario que permita calcular el momento del
  aviso.

## Flujo principal

1. El usuario solicita configurar el recordatorio de una tarea.
2. El sistema muestra el formulario con el tipo de recordatorio y su
   antelación.
3. El usuario introduce o modifica los datos del aviso.
4. El sistema valida la tarea, el horario y la configuración indicada.
5. El usuario confirma el guardado.
6. El sistema registra o actualiza el recordatorio asociado a la tarea en
   estado `Creado`.
7. El sistema mantiene abierta la planificación.

## Flujos alternativos

- Si el usuario no ha iniciado sesión, el sistema solicita autenticación sin
  guardar cambios.
- Si el usuario no tiene permisos de gestión, el sistema rechaza la operación.
- Si la tarea no existe o carece de horario utilizable, el sistema informa del
  problema y no registra el recordatorio.
- Si la fecha u hora resultante es inválida, por ejemplo porque la antelación
  no sitúa el aviso antes de la tarea, el sistema solicita corregir los datos.
- Si ya existe un recordatorio equivalente, el sistema evita crear un
  duplicado y permite actualizar la configuración existente.
- Si el usuario cancela o falla el guardado, se conserva la configuración
  anterior y continúa abierto `PLANIFICACION_ABIERTO`.

## Postcondiciones

El recordatorio queda registrado o actualizado y asociado a la tarea en estado
`Creado`. Al alcanzarse su hora de envío se notifica y pasa a `Finalizado`;
también finaliza si la tarea se cancela.

## Elementos relacionados en SdR

- `documents/actoresYCasosDeUso/detalladoYPrototipado/planificacionYConfiguracion/configurarRecordatorio/configurarRecordatorioPrototipado.svg`
- `documents/actoresYCasosDeUso/diagramas/diagramaPlanificaciónYDetalles/diagramaPlanificacionYDetalles.puml`
- `documents/actoresYCasosDeUso/diagramaContexto/diagramaContextoAdmin.puml`
- `documents/actoresYCasosDeUso/diagramaContexto/diagramaContextoMiembroAdmin.puml`
- `documents/modelosUML/modeloDeDominio/diagramaClases/diagramaClases.puml`
- `documents/modelosUML/modeloDeDominio/diagramaEstados/diagramaEstadosRecordatorio.puml`
- `documents/minutas/primeraReunion/notasTomadas.md`

No existe implementación directa en código. El caso de uso se ha inferido
exclusivamente desde los artefactos de SdR indicados, nunca desde `sdvc`.

## Observaciones

El PUML específico de `configurarRecordatorio()` en SdR contiene por error el
flujo de `definirLocalizacion()`. Ese contenido no debe trasladarse al
desarrollo: el recordatorio no dependerá de localización, mapas, rutas ni
proximidad geográfica. Conviene corregir el artefacto y concretar qué tipos de
aviso admite la primera implementación.
