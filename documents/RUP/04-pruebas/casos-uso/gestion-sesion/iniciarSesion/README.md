# iniciarSesion > Pruebas

## Smoke ejecutado

| Escenario | Resultado esperado | Estado |
| --- | --- | --- |
| Login con `demo@brenotask.local` y contrasena correcta | Token, usuario y estado `SISTEMA_DISPONIBLE` | Verificado |
| Login con campos vacios | Error funcional de campos obligatorios | Verificado en UI |
| Token guardado en navegador | La sesion se recupera al recargar si el backend mantiene la sesion activa | Verificado |

## Pendiente

- Automatizar login y errores de credenciales cuando exista suite.
