# eliminarMiembro() > Pruebas

## Objetivo

Verificar que un usuario con permisos de gestion puede retirar miembros de un
grupo sin borrar usuarios globales ni dejar el grupo sin administracion.

## Escenarios cubiertos

| Escenario | Resultado esperado | Estado |
| --- | --- | --- |
| Gestor elimina un miembro ordinario | La fila desaparece de `miembros_grupo` y el listado de miembros se actualiza | Verificado |
| Usuario externo intenta eliminar | La operacion se rechaza porque el grupo no esta disponible para ese usuario | Verificado |
| Miembro inexistente | La API devuelve error funcional `miembro_no_disponible` | Verificado |
| Eliminacion de un gestor cuando queda otro gestor | La baja se permite | Verificado |
| Intento de eliminar el ultimo gestor | La API devuelve `grupo_sin_gestion` y conserva la pertenencia | Verificado |
| Confirmacion desde interfaz | La eliminacion no se ejecuta hasta confirmar en la fila del miembro | Verificado en navegador integrado |

## Verificacion ejecutada

```powershell
cd app/backend
.\.venv\Scripts\python.exe -m compileall database.py init_db.py main.py models routes schemas services
```

```powershell
cd app/frontend
npm run build
```

Tambien se ejecuto un smoke de servicio con SQLite temporal para probar el
flujo principal y los errores funcionales sin depender del servidor vivo.
En navegador integrado se creo un miembro temporal, se abrio el panel
`Miembros`, se solicito su eliminacion, se confirmo desde la propia fila y se
verifico mensaje de exito, desaparicion de la fila, actualizacion del contador
y ausencia de overflow horizontal o solapamiento entre tarjetas. Los datos
temporales se limpiaron al terminar.

## Observaciones

La prueba funcional se centra en la tabla `miembros_grupo`, porque el caso de
uso elimina una pertenencia al grupo. Las tareas asociadas quedan fuera porque
el subsistema de tareas todavia no existe en la implementacion tecnica actual.
