# iniciarSesion() > Diseño

## Información del artefacto

| Campo | Valor |
| --- | --- |
| Proyecto | BreñoTask |
| Fase RUP | Elaboración |
| Disciplina | Diseño |
| Versión | 1.0 |
| Autor | Equipo de desarrollo |
| Caso de uso relacionado | iniciarSesion() |
| Módulo funcional | Gestión de sesión y navegación |

## Propósito

Diseñar la colaboración necesaria para autenticar conceptualmente a un usuario y abrir una sesión de trabajo en BreñoTask.

## Participantes de diseño

| Participante | Tipo | Responsabilidad |
| --- | --- | --- |
| Usuario | Actor | Inicia el caso de uso y recibe el resultado funcional. |
| Interfaz de usuario | Límite conceptual | Recoge datos, muestra validaciones y presenta el resultado. |
| Coordinador del caso de uso | Control | Ordena el flujo de iniciarSesion() y decide qué servicio invocar. |
| Servicio de aplicación | Aplicación | Ejecuta la operación de diseño y coordina persistencia, dominio y estado. |
| Servicio de dominio | Dominio | Aplica reglas, permisos y validaciones del modelo. |
| Repositorio conceptual / persistencia conceptual | Persistencia conceptual | Consulta o registra los datos necesarios sin fijar tecnología. |
| Estado de aplicación o sesión | Estado | Mantiene el estado navegacional y operativo afectado por el caso. |
| Entidades de dominio implicadas | Dominio | Usuario, EstadoAplicacion, Sesion. |

## Decisiones de diseño

- Datos necesarios: email o identificador de acceso, credencial, estado de sesión.
- Entidades afectadas: Usuario, EstadoAplicacion, Sesion.
- Cambios de estado: SESION_CERRADA, SISTEMA_DISPONIBLE.
- Relación con otros casos de uso: el caso se integra dentro del módulo Gestión de sesión y navegación y respeta las transiciones definidas en análisis.
- Decisión específica: La autenticación se diseña como cambio de estado de sesión, sin fijar todavía mecanismo técnico concreto.
- Aspectos pendientes para implementación: concretar componentes, almacenamiento y mecanismo técnico sin cambiar la responsabilidad conceptual diseñada.

## Flujo de diseño

1. El usuario solicita iniciarSesion() desde la interfaz.
2. La interfaz recoge los datos necesarios y los entrega al coordinador del caso de uso.
3. El coordinador invoca el servicio de aplicación correspondiente.
4. El servicio de aplicación solicita al servicio de dominio la validación de reglas, permisos y consistencia.
5. El servicio de dominio consulta el repositorio conceptual o el estado de aplicación cuando necesita datos previos.
6. Si las validaciones son correctas, el servicio de aplicación registra los cambios conceptuales y actualiza los estados afectados.
7. La interfaz presenta el resultado al usuario.
8. Si aparece un error funcional, se informa sin aplicar cambios no válidos.

## Estados afectados

SESION_CERRADA, SISTEMA_DISPONIBLE

## Validaciones

- El usuario debe existir o estar reconocido por el sistema.
- Las credenciales deben ser válidas.
- La sesión no debe estar ya abierta de forma incompatible.

## Excepciones o errores

- Credenciales inválidas.
- Usuario no encontrado.
- Fallo al registrar el estado de sesión.

## Resultado esperado

El usuario queda identificado y el sistema pasa a un estado disponible para operar.

## Trazabilidad

| Elemento de análisis usado | Decisión de diseño derivada | Entidad o módulo afectado | Estado |
| --- | --- | --- | --- |
| [README de análisis](../../../../01-analisis/casos-uso/gestion-sesion/iniciarSesion/README.md) | Convertir el comportamiento funcional en colaboración entre interfaz, coordinador y servicios conceptuales. | Gestión de sesión y navegación | diseñado |
| [Diagrama de colaboración](../../../../01-analisis/casos-uso/gestion-sesion/iniciarSesion/colaboracion.puml) | Mantener separación entre límite, control y dominio sin fijar tecnología. | CoordinadorIniciarSesion, ServicioAplicacion, ServicioDominio | diseñado |
| [Secuencia de análisis](../../../../01-analisis/casos-uso/gestion-sesion/iniciarSesion/secuencia.puml) | Preservar orden de interacción y estados principales. | EstadoAplicacion, Usuario, EstadoAplicacion, Sesion | diseñado |
| Revisión previa al diseño | Aplicar criterios transversales de permisos, estados y consistencia. | Modelo de dominio de diseño | diseñado |

## PlantUML del flujo de diseño

`plantuml
@startuml iniciarSesion-diseno-secuencia
title Diseño conceptual: iniciarSesion()

actor "Usuario" as Usuario
participant "Interfaz" as Interfaz
participant "CoordinadorIniciarSesion" as Coordinador
participant "ServicioAplicacion" as ServicioAplicacion
participant "ServicioDominio" as ServicioDominio
database "RepositorioConceptual" as Repositorio
participant "EstadoAplicacion" as EstadoAplicacion

Usuario -> Interfaz : solicita iniciarSesion()
Interfaz -> Coordinador : enviar datos de entrada
Coordinador -> ServicioAplicacion : ejecutar iniciarSesion()
ServicioAplicacion -> ServicioDominio : validar reglas del caso
ServicioDominio -> Repositorio : consultar Usuario, EstadoAplicacion, Sesion
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