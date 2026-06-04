# Configuración conceptual y estructura de diseño

## Información del artefacto

- Proyecto: BreñoTask
- Fase RUP: Elaboración
- Disciplina: Diseño
- Versión: 1.0
- Autor: Equipo de desarrollo

## Propósito

Este documento define cómo se organiza el diseño antes de pasar a implementación. No fija todavía tecnología concreta de frontend, backend, base de datos ni almacenamiento. Su función es servir como puente entre el análisis terminado y el código futuro.

## Organización de responsabilidades

| Capa conceptual | Responsabilidad | No debe hacer |
| --- | --- | --- |
| Interfaz | Recoger datos del usuario y presentar resultados. | Aplicar reglas de dominio o decidir persistencia. |
| Coordinación de casos de uso | Ordenar el flujo de cada caso y traducir intención de usuario en operación. | Guardar datos directamente o contener reglas de negocio profundas. |
| Servicios de aplicación | Orquestar reglas, estado y persistencia conceptual. | Mezclar detalles visuales o tecnología concreta. |
| Servicios de dominio | Validar permisos, invariantes y relaciones entre entidades. | Conocer pantallas o mecanismos técnicos. |
| Persistencia conceptual | Representar lectura y escritura de entidades. | Fijar motor de base de datos o formato físico. |
| Estado de aplicación / sesión | Mantener estado navegacional y sesión activa. | Sustituir el modelo de dominio. |

## Estructura documental usada

```text
documents/RUP/02-diseño/
  README.md
  arquitectura.puml
  arquitectura.svg
  clases-diseno.puml
  clases-diseno.svg
  configuracion-proyecto.md
  decisiones-diseno.md
  trazabilidad-analisis-diseno.md
  casos-uso/
    <modulo>/<caso>/README.md
    <modulo>/<caso>/secuencia.puml
    <modulo>/<caso>/secuencia.svg
```

## Reglas de diseño

- Cada caso de uso debe tener un coordinador conceptual propio.
- Las validaciones funcionales se documentan antes de implementar.
- Las entidades de dominio se mantienen independientes de la interfaz.
- La persistencia se mantiene conceptual hasta decidir tecnología en implementación.
- Los estados de navegación proceden de los diagramas de contexto y análisis.
- Si falta información se marca como [PENDIENTE] en lugar de inventar requisitos.

## Mapeo posterior esperado

| Diseño conceptual | Implementación futura |
| --- | --- |
| Interfaz | Componentes o pantallas concretas. |
| Coordinador del caso de uso | Controlador, handler o función orquestadora. |
| Servicio de aplicación | Servicio que ejecuta operaciones del caso. |
| Servicio de dominio | Reglas e invariantes del modelo. |
| Repositorio conceptual | Adaptador de almacenamiento. |
| Estado de aplicación | Mecanismo real de sesión/navegación. |

## Pendiente antes de construir

- Elegir tecnología concreta.
- Definir estructura real de src/.
- Definir almacenamiento físico.
- Priorizar el primer incremento implementable.
- Crear pruebas ejecutables a partir de los escenarios diseñados.
