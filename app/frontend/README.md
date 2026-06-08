# Frontend BreñoTask

Aplicacion React + Vite para la primera iteracion del modulo de gestion de sesion y navegacion.

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
- Mostrar dashboard basico en `SISTEMA_DISPONIBLE`.
- Mostrar el panel principal con estado de sesion activo.
- Cerrar sesion y volver a `SESION_CERRADA`.
