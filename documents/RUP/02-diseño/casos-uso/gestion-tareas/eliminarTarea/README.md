# eliminarTarea() > Diseño

## Información del artefacto

| Campo | Valor |
| --- | --- |
| Proyecto | BreñoTask |
| Fase RUP | Elaboración |
| Disciplina | Diseño |
| Versión | 1.0 |
| Autor | Equipo de desarrollo |
| Caso de uso relacionado | eliminarTarea() |
| Módulo funcional | Gestión de tareas |

## Propósito

Diseñar la eliminación confirmada de una tarea.

## Participantes de diseño

| Participante | Tipo | Responsabilidad |
| --- | --- | --- |
| Usuario | Actor | Inicia el caso de uso y recibe el resultado funcional. |
| Interfaz de usuario | Límite conceptual | Recoge datos, muestra validaciones y presenta el resultado. |
| Coordinador del caso de uso | Control | Ordena el flujo de eliminarTarea() y decide qué servicio invocar. |
| Servicio de aplicación | Aplicación | Ejecuta la operación de diseño y coordina persistencia, dominio y estado. |
| Servicio de dominio | Dominio | Aplica reglas, permisos y validaciones del modelo. |
| Repositorio conceptual / persistencia conceptual | Persistencia conceptual | Consulta o registra los datos necesarios sin fijar tecnología. |
| Estado de aplicación o sesión | Estado | Mantiene el estado navegacional y operativo afectado por el caso. |
| Entidades de dominio implicadas | Dominio | Tarea, RelacionTareas, Recordatorio, ConflictoHorario. |

## Decisiones de diseño

- Datos necesarios: tarea seleccionada y confirmación.
- Entidades afectadas: Tarea, RelacionTareas, Recordatorio, ConflictoHorario.
- Cambios de estado: TAREA_ABIERTO, TAREAS_ABIERTO.
- Relación con otros casos de uso: el caso se integra dentro del módulo Gestión de tareas y respeta las transiciones definidas en análisis.
- Decisión específica: Eliminar tarea no equivale a cancelar estado; es una operación irreversible tras confirmación.
- Aspectos pendientes para implementación: concretar componentes, almacenamiento y mecanismo técnico sin cambiar la responsabilidad conceptual diseñada.

## Flujo de diseño

1. El usuario solicita eliminarTarea() desde la interfaz.
2. La interfaz recoge los datos necesarios y los entrega al coordinador del caso de uso.
3. El coordinador invoca el servicio de aplicación correspondiente.
4. El servicio de aplicación solicita al servicio de dominio la validación de reglas, permisos y consistencia.
5. El servicio de dominio consulta el repositorio conceptual o el estado de aplicación cuando necesita datos previos.
6. Si las validaciones son correctas, el servicio de aplicación registra los cambios conceptuales y actualiza los estados afectados.
7. La interfaz presenta el resultado al usuario.
8. Si aparece un error funcional, se informa sin aplicar cambios no válidos.

## Estados afectados

TAREA_ABIERTO, TAREAS_ABIERTO

## Validaciones

- La tarea debe existir.
- El usuario debe poder eliminarla.
- La eliminación debe estar confirmada.

## Excepciones o errores

- Tarea inexistente.
- Permisos insuficientes.
- Eliminación cancelada.
- Fallo al limpiar relaciones dependientes.

## Resultado esperado

La tarea deja de estar disponible y se limpian relaciones auxiliares afectadas.

## Trazabilidad

| Elemento de análisis usado | Decisión de diseño derivada | Entidad o módulo afectado | Estado |
| --- | --- | --- | --- |
| [README de análisis](../../../../01-analisis/casos-uso/gestion-tareas/eliminarTarea/README.md) | Convertir el comportamiento funcional en colaboración entre interfaz, coordinador y servicios conceptuales. | Gestión de tareas | diseñado |
| [Diagrama de colaboración](../../../../01-analisis/casos-uso/gestion-tareas/eliminarTarea/colaboracion.puml) | Mantener separación entre límite, control y dominio sin fijar tecnología. | CoordinadorEliminarTarea, ServicioAplicacion, ServicioDominio | diseñado |
| [Secuencia de análisis](../../../../01-analisis/casos-uso/gestion-tareas/eliminarTarea/secuencia.puml) | Preservar orden de interacción y estados principales. | EstadoAplicacion, Tarea, RelacionTareas, Recordatorio, ConflictoHorario | diseñado |
| Revisión previa al diseño | Aplicar criterios transversales de permisos, estados y consistencia. | Modelo de dominio de diseño | diseñado |

## PlantUML del flujo de diseño

![Secuencia de diseño de eliminarTarea()](./secuencia.svg)

```plantuml
@startuml eliminarTarea-diseno-secuencia
title Diseño conceptual: eliminarTarea()

actor "Usuario" as Usuario
participant "Interfaz" as Interfaz
participant "CoordinadorEliminarTarea" as Coordinador
participant "ServicioAplicacion" as ServicioAplicacion
participant "ServicioDominio" as ServicioDominio
database "RepositorioConceptual" as Repositorio
participant "EstadoAplicacion" as EstadoAplicacion

Usuario -> Interfaz : solicita eliminarTarea()
Interfaz -> Coordinador : enviar datos de entrada
Coordinador -> ServicioAplicacion : ejecutar eliminarTarea()
ServicioAplicacion -> ServicioDominio : validar reglas del caso
ServicioDominio -> Repositorio : consultar Tarea, RelacionTareas, Recordatorio, ConflictoHorario
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
```

## Artefactos

- [secuencia.puml](./secuencia.puml)
- [secuencia.svg](./secuencia.svg)