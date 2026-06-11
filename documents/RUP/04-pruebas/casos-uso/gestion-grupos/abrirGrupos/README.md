# abrirGrupos > Pruebas

## Smoke ejecutado

| Escenario | Resultado esperado | Estado |
| --- | --- | --- |
| Usuario autenticado abre grupos | Se listan solo sus grupos | Verificado |
| Grupo visible | Muestra nombre, descripcion, rol y numero de miembros | Verificado |
| Filtro por nombre | La lista se reduce en frontend sin llamar al backend | Verificado |
| Sin token valido | Error de sesion no activa | Verificado por API |

## Pendiente

- Automatizar el filtro visual cuando exista suite frontend.
