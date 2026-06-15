<div align="center">

# BreñoTask

### Análisis, diseño e implementación RUP de un sistema de tareas compartidas

BreñoTask permite que familias y grupos coordinen, asignen y sigan tareas del
día a día con menos olvidos, solapamientos y desorganización.

[![RUP](https://img.shields.io/badge/RUP-documentación-0f766e?style=for-the-badge)](./documents/RUP/README.md)
[![Análisis](https://img.shields.io/badge/01-análisis-2563eb?style=for-the-badge)](./documents/RUP/01-analisis/README.md)
[![Diseño](https://img.shields.io/badge/02-diseño-7c3aed?style=for-the-badge)](./documents/RUP/02-diseño/README.md)
[![Aplicación](https://img.shields.io/badge/app-React%20%2B%20FastAPI-111827?style=for-the-badge)](./app/README.md)

</div>

---

## Vista general

Este repositorio desarrolla **BreñoTask** siguiendo una estructura RUP:
requisitos y casos de uso, análisis, diseño e implementación incremental. La
aplicación funcional se encuentra en `app/`, con frontend React y backend
FastAPI sobre SQLite.

El objetivo del proyecto no es solo tener una app funcionando, sino mantener
trazabilidad entre lo que se pide, lo que se analiza, lo que se diseña y lo que
finalmente se implementa.

## Accesos principales

| Área | Enlace | Contenido |
| --- | --- | --- |
| RUP | [documents/RUP](./documents/RUP/README.md) | Índice general de la documentación RUP. |
| Casos de uso | [00-casos-uso](./documents/RUP/00-casos-uso/README.md) | Actores, modelo del dominio, detalle y prototipos heredados de SdR. |
| Análisis | [01-analisis](./documents/RUP/01-analisis/README.md) | Índice de casos; cada caso incluye análisis y diagramas. |
| Diseño | [02-diseño](./documents/RUP/02-diseño/README.md) | Arquitectura, modelo de diseño, trazabilidad y diseño por caso. |
| Desarrollo | [03-desarrollo](./documents/RUP/03-desarrollo/README.md) | Seguimiento de implementación por caso de uso. |
| Aplicación | [app](./app/README.md) | Código ejecutable: frontend, backend y base de datos. |
| Log de trabajo | [conversation-log.md](./conversation-log.md) | Registro de decisiones y avances realizados con IA. |

## Estructura del repositorio

```text
.
├── app/                 Aplicación funcional
│   ├── backend/         API REST con FastAPI
│   ├── database/        Esquema SQL, semilla y SQLite
│   └── frontend/        Interfaz React + Vite
├── documents/           Documentación principal del proyecto
│   └── RUP/             Fases RUP organizadas por disciplina
├── conversation-log.md  Registro de prompts, resultados y decisiones
└── QUE_HACE.md          Resumen del alcance funcional
```

## Aplicación implementada

El incremento funcional cubre los módulos principales descritos en los casos de
uso:

- Sesión y navegación.
- Gestión de grupos, invitaciones y miembros.
- Gestión de tareas.
- Planificación, asignación, localización, recordatorios y solapamientos.

Quedan fuera del alcance actual las notificaciones reales externas, mapas,
rutas y planificación avanzada.

## Ejecución rápida

### Backend

```powershell
cd app/backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python init_db.py
uvicorn main:app --reload --port 8000
```

### Frontend

```powershell
cd app/frontend
npm install
npm run dev
```

La aplicación queda disponible normalmente en:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8000`

## Usuario de prueba

| Campo | Valor |
| --- | --- |
| Email | `demo@brenotask.local` |
| Contraseña | `breno123` |
| Rol | `Administrador` |

## Documentos de apoyo

- [Protocolo de sesiones con IA](./documents/protocolo-sesiones-ia.md)
- [Revisión de coherencia previa al diseño](./documents/revision-pre-diseno.md)
- [Criterios de integración](./documents/criterios-integracion.md)
