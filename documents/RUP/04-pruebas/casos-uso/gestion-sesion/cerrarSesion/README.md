# cerrarSesion > Pruebas

## Smoke ejecutado

| Escenario | Resultado esperado | Estado |
| --- | --- | --- |
| Pulsar `Cerrar sesion` | Se muestra confirmacion antes de cerrar | Verificado |
| Cancelar cierre | El usuario permanece en el panel | Verificado |
| Confirmar cierre | Token eliminado y vuelta a `SESION_CERRADA` | Verificado |

## Pendiente

- Automatizar la confirmacion cuando exista suite frontend.
