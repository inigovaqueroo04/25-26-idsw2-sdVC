# abrirPlanificacion()

## Objetivo

Permitir que un perfil con permisos acceda al módulo de planificación desde el
menú principal. La vista reúne los detalles temporales y espaciales de las
tareas y deja disponibles las operaciones de configuración relacionadas.

## Actor principal

`Miembro Administrador` o `Administrador`. El detalle de SdR utiliza el término
genérico `Usuario`, pero los diagramas de planificación y contexto reservan el
módulo a perfiles con permisos de gestión.

## Precondiciones

- El usuario ha iniciado sesión.
- El sistema está en `SISTEMA_DISPONIBLE`.
- El usuario tiene permisos para gestionar la planificación.
- El sistema puede consultar los datos de planificación disponibles.

## Flujo principal

1. El usuario solicita abrir la planificación desde `SISTEMA_DISPONIBLE`.
2. El sistema carga los datos planificados accesibles para el usuario.
3. El sistema muestra la vista de planificación con horarios, recordatorios y
   localizaciones disponibles.
4. El sistema deja disponibles `establecerHorario()`,
   `definirLocalizacion()`, `configurarRecordatorio()` y
   `asignarTareaAUsuario()`.
5. El sistema pasa a `PLANIFICACION_ABIERTO`.

## Flujos alternativos

- Usuario no autenticado: el sistema impide el acceso y solicita iniciar
  sesión.
- Usuario sin permisos: el sistema no abre el módulo de planificación.
- Fallo al cargar: el sistema informa del error y permite reintentar o volver a
  `SISTEMA_DISPONIBLE`.
- Grupo no seleccionado: si una operación posterior necesita contexto de
  grupo, el sistema solicita seleccionarlo antes de aplicarla.
- Sin datos planificados: el sistema muestra la vista vacía y mantiene
  disponibles las opciones de configuración.
- Salida: el usuario ejecuta `completarGestion()` y vuelve a
  `SISTEMA_DISPONIBLE`.

## Postcondiciones

La planificación queda visible en `PLANIFICACION_ABIERTO`. El usuario puede
consultar los datos existentes y solicitar la configuración de horarios,
localizaciones, recordatorios o asignaciones.

## Elementos relacionados en SdR

- `documents/actoresYCasosDeUso/README.md`: enumera `abrirPlanificacion()`
  dentro de planificación y configuración.
- `documents/actoresYCasosDeUso/detalladoYPrototipado/planificacionYConfiguracion/abrirPlanificacion/`:
  contiene el detalle, el PUML, el SVG y el prototipo del caso.
- `documents/actoresYCasosDeUso/diagramas/diagramaPlanificaciónYDetalles/diagramaPlanificacionYDetalles.puml`:
  asigna el acceso al `Miembro Administrador`, con herencia para
  `Administrador`.
- `documents/actoresYCasosDeUso/diagramaContexto/diagramaContextoAdmin.puml` y
  `documents/actoresYCasosDeUso/diagramaContexto/diagramaContextoMiembroAdmin.puml`:
  definen la transición `SISTEMA_DISPONIBLE -> PLANIFICACION_ABIERTO` y las
  operaciones autorreflexivas disponibles.
- `documents/actoresYCasosDeUso/diagramaContexto/README.md`: describe
  `PLANIFICACION_ABIERTO` como módulo de detalles, horarios y recordatorios.
- `documents/modelosUML/modeloDeDominio/diagramaClases/diagramaClases.puml`:
  relaciona `Tarea` con `Horario`, `Localizacion` y `Recordatorio`.

No se ha localizado implementación directa en código. El análisis se ha
inferido desde la documentación, los diagramas y la estructura del repositorio
SdR.

## Diagramas de análisis

### Colaboración

![Colaboración de análisis](./colaboracion.svg)

Código fuente: [colaboracion.puml](./colaboracion.puml)

### Secuencia

![Secuencia de análisis](./secuencia.svg)

Código fuente: [secuencia.puml](./secuencia.puml)

## Observaciones

SdR no concreta si la planificación se abre como agenda global o por grupo.
Para diseño se adopta una agenda global con filtro opcional por grupo. Cada
mutación se aplicará al grupo de la tarea seleccionada.
