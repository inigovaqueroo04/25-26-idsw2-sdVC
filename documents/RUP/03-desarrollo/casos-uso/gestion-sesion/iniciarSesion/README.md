# iniciarSesion > Desarrollo

## Implementacion

El caso se implementa como login contra SQLite. El backend valida email,
contrasena y hash SHA-256, crea un token de sesion en memoria y devuelve el
usuario autenticado con estado `SISTEMA_DISPONIBLE`.

Archivos principales:

- `app/backend/routes/auth.py`
- `app/backend/services/auth_service.py`
- `app/backend/schemas/auth.py`
- `app/frontend/src/App.jsx`
- `app/frontend/src/api/auth.js`

## Decision

La sesion se mantiene en memoria y el frontend guarda el token en
`localStorage`. Es suficiente para la entrega funcional; persistencia avanzada,
caducidad y renovacion de sesion quedan fuera.
