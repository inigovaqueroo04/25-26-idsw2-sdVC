# Frontend BreñoTask

Aplicacion React + Vite para las primeras iteraciones verticales de BreñoTask.

## Instalacion y ejecucion

```powershell
cd app/frontend
npm install
npm run dev
```

Por defecto se conecta con `http://localhost:8000/api`. Para cambiarlo:

```powershell
$env:VITE_API_URL="http://localhost:8000/api"
npm run dev
```

## Flujo disponible

- Mostrar login si no hay sesion.
- Iniciar sesion con el usuario de prueba.
- Mostrar dashboard basico con estado de sesion activo.
- Mostrar el panel principal con estado de sesion activo.
- Mostrar la seccion `Mis grupos` con los grupos del usuario autenticado.
- Filtrar grupos por nombre desde el frontend.
- Crear un grupo nuevo desde el dashboard.
- Editar nombre y descripcion de un grupo propio desde su tarjeta.
- Eliminar un grupo propio con confirmacion desde su tarjeta.
- Registrar una invitacion pendiente desde la tarjeta de un grupo gestionable.
- Cerrar sesion y volver a `SESION_CERRADA`.
