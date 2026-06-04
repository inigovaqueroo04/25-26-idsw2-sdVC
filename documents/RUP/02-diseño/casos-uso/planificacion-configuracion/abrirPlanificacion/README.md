# abrirPlanificacion() > Diseño

## Información del artefacto

| Campo | Valor |
| --- | --- |
| Proyecto | BreñoTask |
| Fase RUP | Elaboración |
| Disciplina | Diseño |
| Versión | 1.0 |
| Autor | Equipo de desarrollo |
| Caso de uso relacionado | abrirPlanificacion() |
| Módulo funcional | Planificación y configuración |

## Propósito

Diseñar la apertura de la vista global de planificación de tareas.

## Participantes de diseño

| Participante | Tipo | Responsabilidad |
| --- | --- | --- |
| Usuario | Actor | Inicia el caso de uso y recibe el resultado funcional. |
| Interfaz de usuario | Límite conceptual | Recoge datos, muestra validaciones y presenta el resultado. |
| Coordinador del caso de uso | Control | Ordena el flujo de abrirPlanificacion() y decide qué servicio invocar. |
| Servicio de aplicación | Aplicación | Ejecuta la operación de diseño y coordina persistencia, dominio y estado. |
| Servicio de dominio | Dominio | Aplica reglas, permisos y validaciones del modelo. |
| Repositorio conceptual / persistencia conceptual | Persistencia conceptual | Consulta o registra los datos necesarios sin fijar tecnología. |
| Estado de aplicación o sesión | Estado | Mantiene el estado navegacional y operativo afectado por el caso. |
| Entidades de dominio implicadas | Dominio | Tarea, Horario, Grupo, Usuario, EstadoAplicacion. |

## Decisiones de diseño

- Datos necesarios: usuario actual, tareas accesibles, filtros de grupo y fecha.
- Entidades afectadas: Tarea, Horario, Grupo, Usuario, EstadoAplicacion.
- Cambios de estado: SISTEMA_DISPONIBLE, PLANIFICACION_ABIERTO.
- Relación con otros casos de uso: el caso se integra dentro del módulo Planificación y configuración y respeta las transiciones definidas en análisis.
- Decisión específica: La planificación se diseña como vista global filtrable, no como agenda separada por grupo.
- Aspectos pendientes para implementación: concretar componentes, almacenamiento y mecanismo técnico sin cambiar la responsabilidad conceptual diseñada.

## Flujo de diseño

1. El usuario solicita abrirPlanificacion() desde la interfaz.
2. La interfaz recoge los datos necesarios y los entrega al coordinador del caso de uso.
3. El coordinador invoca el servicio de aplicación correspondiente.
4. El servicio de aplicación solicita al servicio de dominio la validación de reglas, permisos y consistencia.
5. El servicio de dominio consulta el repositorio conceptual o el estado de aplicación cuando necesita datos previos.
6. Si las validaciones son correctas, el servicio de aplicación registra los cambios conceptuales y actualiza los estados afectados.
7. La interfaz presenta el resultado al usuario.
8. Si aparece un error funcional, se informa sin aplicar cambios no válidos.

## Estados afectados

SISTEMA_DISPONIBLE, PLANIFICACION_ABIERTO

## Validaciones

- El usuario debe estar autenticado.
- Los filtros deben corresponder a grupos accesibles.
- Las tareas deben tener datos suficientes para mostrarse.

## Excepciones o errores

- Usuario sin sesión.
- Filtro no permitido.
- Fallo al recuperar planificación.

## Resultado esperado

La planificación queda visible con tareas organizadas por fecha, grupo u horario.

## Trazabilidad

| Elemento de análisis usado | Decisión de diseño derivada | Entidad o módulo afectado | Estado |
| --- | --- | --- | --- |
| [README de análisis](../../../../01-analisis/casos-uso/planificacion-configuracion/abrirPlanificacion/README.md) | Convertir el comportamiento funcional en colaboración entre interfaz, coordinador y servicios conceptuales. | Planificación y configuración | diseñado |
| [Diagrama de colaboración](../../../../01-analisis/casos-uso/planificacion-configuracion/abrirPlanificacion/colaboracion.puml) | Mantener separación entre límite, control y dominio sin fijar tecnología. | CoordinadorAbrirPlanificacion, ServicioAplicacion, ServicioDominio | diseñado |
| [Secuencia de análisis](../../../../01-analisis/casos-uso/planificacion-configuracion/abrirPlanificacion/secuencia.puml) | Preservar orden de interacción y estados principales. | EstadoAplicacion, Tarea, Horario, Grupo, Usuario, EstadoAplicacion | diseñado |
| Revisión previa al diseño | Aplicar criterios transversales de permisos, estados y consistencia. | Modelo de dominio de diseño | diseñado |

## PlantUML del flujo de diseño

`plantuml
@startuml abrirPlanificacion-diseno-secuencia
title Diseño conceptual: abrirPlanificacion()

actor "Usuario" as Usuario
participant "Interfaz" as Interfaz
participant "CoordinadorAbrirPlanificacion" as Coordinador
participant "ServicioAplicacion" as ServicioAplicacion
participant "ServicioDominio" as ServicioDominio
database "RepositorioConceptual" as Repositorio
participant "EstadoAplicacion" as EstadoAplicacion

Usuario -> Interfaz : solicita abrirPlanificacion()
Interfaz -> Coordinador : enviar datos de entrada
Coordinador -> ServicioAplicacion : ejecutar abrirPlanificacion()
ServicioAplicacion -> ServicioDominio : validar reglas del caso
ServicioDominio -> Repositorio : consultar Tarea, Horario, Grupo, Usuario, EstadoAplicacion
Repositorio --> ServicioDominio : datos conceptuales

alt validaciones correctas
  ServicioDominio --> ServicioAplicacion : resultado de dominio
  ServicioAplicacion -> Repositorio : registrar cambios conceptuales
  ServicioAplicacion -> EstadoAplicacion : actualizar estados afectados
  EstadoAplicacion --> ServicioAplicacion : estado actualizado
  ServicioAplicacion --> Coordinador : resultado correcto
  Coordinador --> Interfaz : preparar respuesta
  Interfaz --> Usuario : mostrar resultado esperado
else error funcional
  ServicioDominio --> ServicioAplicacion : error de validacion
  ServicioAplicacion --> Coordinador : resultado rechazado
  Coordinador --> Interfaz : preparar mensaje de error
  Interfaz --> Usuario : mostrar error sin cambios no validos
end

@enduml
`

## Artefactos

- [secuencia.puml](./secuencia.puml)