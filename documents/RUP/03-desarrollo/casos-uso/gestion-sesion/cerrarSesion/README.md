# cerrarSesion > Desarrollo

## Implementacion

El caso se implementa con `POST /api/auth/logout`. El backend invalida el token
activo y el frontend muestra una confirmacion antes de cerrar la sesion y
volver a `SESION_CERRADA`.

Archivos principales:

- `app/backend/routes/auth.py`
- `app/backend/services/auth_service.py`
- `app/frontend/src/App.jsx`
- `app/frontend/src/api/auth.js`

## Decision

El cierre requiere confirmacion visual para evitar salidas accidentales. Al
cerrar, el token se retira del estado React y de `localStorage`.
