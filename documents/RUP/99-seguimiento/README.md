# 99-seguimiento

Dashboard de avance del proyecto RUP. Esta carpeta se usa para mantener una
vista rapida del estado del trabajo y de los artefactos visuales que ayudan a
entender cada incremento.

## Dashboard de avance por modulo

| Modulo | Analisis | Diseño | Desarrollo | Observacion |
| --- | --- | --- | --- | --- |
| Gestion de sesion y navegacion | Completo | Completo | Implementado | React + FastAPI + SQLite en `app/` |
| Gestion de grupos y usuarios | Completo | Completo | En progreso | CRUD basico, invitaciones recibidas/gestionables y gestion de miembros implementados |
| Gestion de tareas | Completo | Completo | En progreso | Tareas CRUD, finalizacion, conflictos iniciales y dependencia simple implementados |
| Planificacion y configuracion | Completo | Completo | En progreso | Agenda filtrada, horario, responsable, localizacion y recordatorio simple implementados |

## Regla de claridad visual

- Cada vez que se cree o modifique un archivo `.puml`, debe generarse su `.svg`
  equivalente en la misma carpeta.
- El README de la carpeta debe mostrar el `.svg` y enlazar tambien el `.puml`
  fuente.
- Si se implementa un nuevo incremento, este dashboard y el
  `conversation-log.md` se actualizan en la misma tanda de trabajo.
- Los estados internos de RUP pueden aparecer en documentacion tecnica, pero la
  interfaz de usuario debe mostrarlos con texto entendible.

## Diagrama de contexto de seguimiento

![Diagrama de contexto de seguimiento](./diagrama-contexto-admin.svg)

Fuente editable: [diagrama-contexto-admin.puml](./diagrama-contexto-admin.puml)

Vista SVG: [diagrama-contexto-admin.svg](./diagrama-contexto-admin.svg)

## Alcance actual

El proyecto queda preparado para presentacion con documentacion de requisitos,
analisis, diseño, desarrollo y una aplicacion funcional de prototipo.
