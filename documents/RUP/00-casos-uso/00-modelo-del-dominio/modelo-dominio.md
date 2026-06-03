# Modelo de Dominio – Organización de Usuarios, Grupos y Tareas

[![Inicio](https://img.shields.io/badge/Inicio-FFFFFF?style=for-the-badge&logo=homeassistant&logoColor=black)](./README.md)
[![Modelo de Dominio](https://img.shields.io/badge/Modelo%20de%20Dominio-FFFFFF?style=for-the-badge&logo=bookstack&logoColor=black)](./documents/modelosUML/modeloDeDominio/README.md)
[![Actores Y CasosDeUso](https://img.shields.io/badge/Actores%20&%20Casos%20De%20Uso-FFFFFF?style=for-the-badge&logo=openstreetmap&logoColor=black)](./documents/actoresYCasosDeUso/README.md)
[![Diagramas de Contexto](https://img.shields.io/badge/Diagramas%20de%20Contexto-FFFFFF?style=for-the-badge&logo=bookstack&logoColor=black)](./documents/actoresYCasosDeUso/diagramaContexto/README.md)
[![Detallar & Prototipar](https://img.shields.io/badge/Detallar%20&%20Prototipar-FFFFFF?style=for-the-badge&logo=figma&logoColor=black)](./documents/actoresYCasosDeUso/detalladoYPrototipado/README.md)

Este documento explica de forma clara y ordenada cada clase del modelo, su papel dentro del sistema y el motivo de su colocación jerárquica. El objetivo del dominio es representar cómo **usuarios organizados en grupos gestionan tareas**, y cómo estas tareas se complementan con información de ubicación, horario, recordatorios, relaciones y posibles conflictos.

El diagrama se estructura en **niveles** porque cada elemento depende del anterior: primero las personas, luego los grupos, después las tareas y finalmente los detalles específicos de cada tarea.

---

## Nivel 1 — Tarea

### `Tarea`

Es el elemento central del sistema. Representa una acción que debe planificarse.

- Puede tener subtareas (relación *subtarea de*).
- Pertenece a un grupo y afecta a usuarios.
- Se relaciona con todos los elementos del nivel 4.
- Permite dependencias con otras tareas mediante `RelacionTareas`.

**Por qué está en el nivel 1:**  
Es el núcleo operativo del dominio: todo el sistema se organiza para gestionar y coordinar tareas.

---

## Nivel 2 — Usuario

### `Usuario`

Representa a la persona que interactúa con el sistema.

- Puede pertenecer a uno o varios grupos independientemente el uno del otro.  
- Es quien crea, modifica o recibe información sobre tareas.
- Recibe notificaciones cuando sus tareas presentan conflictos de horario.
- Funciona como la “entidad principal” que da sentido a los datos del sistema.

### `Rol`

Define la función, permisos o responsabilidades que tiene un usuario dentro del sistema.

- Un usuario “tiene” un rol específico (por ejemplo: Administrador, Miembro).
- Determina qué acciones puede realizar sobre los grupos y las tareas.
- Establece el nivel de acceso y seguridad para cada persona.

**Por qué está arriba:**  
La planificación del sistema nace en los usuarios. Todo lo demás se organiza alrededor de ellos.

---

## Nivel 3 — Grupo

### `Grupo`

Conjunto organizado de usuarios.

- Un usuario “participa en” uno o varios grupos independientes entre ellos.
- Un grupo “es gestionado” por uno o varios usuarios.
- Sirve para separar conjuntos de tareas: un usuario puede tener tareas distintas según el grupo.
- Facilita la coordinación (familia, piso compartido, equipo de estudio, proyecto, etc.).

**Por qué va debajo de Usuario:**  
Los grupos existen para agrupar usuarios; sin personas, no habría grupos.

---

## Nivel 4 — Elementos de Soporte de las Tareas

Este nivel contiene las clases que complementan y describen cada tarea.  
Ninguna tiene sentido por sí sola sin existir al menos una tarea.

---

### `Localizacion`

Define el lugar donde se realiza la tarea.

- La tarea “se realiza en” una localización (casa, tienda, universidad…).
- Apoya la organización espacial.

### `Horario`

Define cuándo ocurre la tarea.

- Incluye fecha, hora de inicio, duración y posibles repeticiones.
- La tarea “se programa en” un horario.
- Permite detectar solapamientos, por pequeños que sean.

### `Recordatorio`

Configura avisos previos.

- La tarea “notifica” mediante un recordatorio.
- Mejora la gestión personal del usuario.

### `RelacionTareas`

Representa vínculos lógicos entre tareas.

- Permite dependencias (primero A, luego B), bloqueos o relaciones de apoyo.
- Una tarea “se relaciona con” otra.

### `ConflictoHorario`

Indica que dos tareas se solapan o no pueden realizarse simultáneamente.

- Una tarea “afecta a” un conflicto si su horario colisiona con otra.
- El usuario correspondiente recibe la notificación de dicho conflicto.

**Por qué están en nivel 4:**  
Son elementos descriptivos y dependientes. No tienen jerarquía propia ni existen sin una tarea.

---

## Resumen Jerárquico

1. **Usuarios**: origen de la información y quienes realizan las tareas.  
2. **Grupos**: organizan a los usuarios y separan contextos.  
3. **Tareas**: centro del modelo; todo se estructura alrededor de ellas.  
4. **Localización, Horario, Recordatorio, RelacionTareas, ConflictoHorario**: completan y enriquecen la definición de cada tarea.

---
