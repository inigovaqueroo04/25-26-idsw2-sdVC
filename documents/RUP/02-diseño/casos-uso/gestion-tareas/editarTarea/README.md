# editarTarea() > Diseño

## Información del artefacto

| Campo | Valor |
| --- | --- |
| Proyecto | BreñoTask |
| Fase RUP | Elaboración |
| Disciplina | Diseño |
| Versión | 1.0 |
| Autor | Equipo de desarrollo |
| Caso de uso relacionado | editarTarea() |
| Módulo funcional | Gestión de tareas |

## Propósito

Diseñar la modificación de los datos de una tarea existente.

## Participantes de diseño

| Participante | Tipo | Responsabilidad |
| --- | --- | --- |
| Usuario | Actor | Inicia el caso de uso y recibe el resultado funcional. |
| Interfaz de usuario | Límite conceptual | Recoge datos, muestra validaciones y presenta el resultado. |
| Coordinador del caso de uso | Control | Ordena el flujo de editarTarea() y decide qué servicio invocar. |
| Servicio de aplicación | Aplicación | Ejecuta la operación de diseño y coordina persistencia, dominio y estado. |
| Servicio de dominio | Dominio | Aplica reglas, permisos y validaciones del modelo. |
| Repositorio conceptual / persistencia conceptual | Persistencia conceptual | Consulta o registra los datos necesarios sin fijar tecnología. |
| Estado de aplicación o sesión | Estado | Mantiene el estado navegacional y operativo afectado por el caso. |
| Entidades de dominio implicadas | Dominio | Tarea, Horario, Localizacion, Recordatorio, ConflictoHorario, RelacionTareas. |

## Decisiones de diseño

- Datos necesarios: tarea seleccionada y nuevos valores confirmados.
- Entidades afectadas: Tarea, Horario, Localizacion, Recordatorio, ConflictoHorario, RelacionTareas.
- Cambios de estado: TAREA_ABIERTO.
- Relación con otros casos de uso: el caso se integra dentro del módulo Gestión de tareas y respeta las transiciones definidas en análisis.
- Decisión específica: La edición conserva valores anteriores cuando el usuario cancela o falla la validación.
- Aspectos pendientes para implementación: concretar componentes, almacenamiento y mecanismo técnico sin cambiar la responsabilidad conceptual diseñada.

## Flujo de diseño

1. El usuario solicita editarTarea() desde la interfaz.
2. La interfaz recoge los datos necesarios y los entrega al coordinador del caso de uso.
3. El coordinador invoca el servicio de aplicación correspondiente.
4. El servicio de aplicación solicita al servicio de dominio la validación de reglas, permisos y consistencia.
5. El servicio de dominio consulta el repositorio conceptual o el estado de aplicación cuando necesita datos previos.
6. Si las validaciones son correctas, el servicio de aplicación registra los cambios conceptuales y actualiza los estados afectados.
7. La interfaz presenta el resultado al usuario.
8. Si aparece un error funcional, se informa sin aplicar cambios no válidos.

## Estados afectados

TAREA_ABIERTO

## Validaciones

- La tarea debe existir.
- El usuario debe poder modificarla.
- Los cambios de horario deben ser válidos.
- Las relaciones y asignaciones deben seguir siendo consistentes.

## Excepciones o errores

- Tarea inexistente.
- Permisos insuficientes.
- Datos inválidos.
- Fallo al guardar cambios.

## Resultado esperado

La tarea actualiza sus datos y se reevaluan efectos sobre planificación y conflictos.

## Trazabilidad

| Elemento de análisis usado | Decisión de diseño derivada | Entidad o módulo afectado | Estado |
| --- | --- | --- | --- |
| [README de análisis](../../../../01-analisis/casos-uso/gestion-tareas/editarTarea/README.md) | Convertir el comportamiento funcional en colaboración entre interfaz, coordinador y servicios conceptuales. | Gestión de tareas | diseñado |
| [Diagrama de colaboración](../../../../01-analisis/casos-uso/gestion-tareas/editarTarea/colaboracion.puml) | Mantener separación entre límite, control y dominio sin fijar tecnología. | CoordinadorEditarTarea, ServicioAplicacion, ServicioDominio | diseñado |
| [Secuencia de análisis](../../../../01-analisis/casos-uso/gestion-tareas/editarTarea/secuencia.puml) | Preservar orden de interacción y estados principales. | EstadoAplicacion, Tarea, Horario, Localizacion, Recordatorio, ConflictoHorario, RelacionTareas | diseñado |
| Revisión previa al diseño | Aplicar criterios transversales de permisos, estados y consistencia. | Modelo de dominio de diseño | diseñado |

## PlantUML del flujo de diseño

![Secuencia de diseño de editarTarea()](./secuencia.svg)

```plantuml
@startuml editarTarea-diseno-secuencia
title Diseño conceptual: editarTarea()

actor "Usuario" as Usuario
participant "Interfaz" as Interfaz
participant "CoordinadorEditarTarea" as Coordinador
participant "ServicioAplicacion" as ServicioAplicacion
participant "ServicioDominio" as ServicioDominio
database "RepositorioConceptual" as Repositorio
participant "EstadoAplicacion" as EstadoAplicacion

Usuario -> Interfaz : solicita editarTarea()
Interfaz -> Coordinador : enviar datos de entrada
Coordinador -> ServicioAplicacion : ejecutar editarTarea()
ServicioAplicacion -> ServicioDominio : validar reglas del caso
ServicioDominio -> Repositorio : consultar Tarea, Horario, Localizacion, Recordatorio, ConflictoHorario, RelacionTareas
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