CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    rol TEXT NOT NULL CHECK (rol IN ('Administrador', 'Miembro Administrador', 'Miembro')),
    creado_en TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_usuarios_email ON usuarios(email);

CREATE TABLE IF NOT EXISTS grupos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    creado_por INTEGER NOT NULL,
    creado_en TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (creado_por) REFERENCES usuarios(id)
);

CREATE TABLE IF NOT EXISTS miembros_grupo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER NOT NULL,
    grupo_id INTEGER NOT NULL,
    rol TEXT NOT NULL CHECK (rol IN ('Administrador', 'Miembro Administrador', 'Miembro')),
    creado_en TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (grupo_id) REFERENCES grupos(id),
    UNIQUE (usuario_id, grupo_id)
);

CREATE TABLE IF NOT EXISTS invitaciones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    grupo_id INTEGER NOT NULL,
    email_invitado TEXT NOT NULL,
    rol_propuesto TEXT NOT NULL CHECK (rol_propuesto IN ('Miembro Administrador', 'Miembro')),
    fecha_limite TEXT NOT NULL,
    estado TEXT NOT NULL CHECK (estado IN ('Pendiente', 'Aceptada', 'Rechazada', 'Caducada', 'Cancelada')),
    invitado_por INTEGER NOT NULL,
    creado_en TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (grupo_id) REFERENCES grupos(id),
    FOREIGN KEY (invitado_por) REFERENCES usuarios(id)
);

CREATE TABLE IF NOT EXISTS tareas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    grupo_id INTEGER NOT NULL,
    titulo TEXT NOT NULL,
    descripcion TEXT,
    fecha TEXT,
    hora_inicio TEXT,
    hora_fin TEXT,
    fecha_finalizacion TEXT,
    asignado_usuario_id INTEGER,
    localizacion TEXT,
    recordatorio_minutos INTEGER,
    estado TEXT NOT NULL CHECK (estado IN ('Creada', 'Programada', 'En ejecucion', 'Finalizada', 'Cancelada')),
    creado_por INTEGER NOT NULL,
    creado_en TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (grupo_id) REFERENCES grupos(id),
    FOREIGN KEY (asignado_usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (creado_por) REFERENCES usuarios(id)
);

CREATE INDEX IF NOT EXISTS idx_grupos_creado_por ON grupos(creado_por);
CREATE INDEX IF NOT EXISTS idx_miembros_grupo_usuario ON miembros_grupo(usuario_id);
CREATE INDEX IF NOT EXISTS idx_miembros_grupo_grupo ON miembros_grupo(grupo_id);
CREATE INDEX IF NOT EXISTS idx_invitaciones_grupo ON invitaciones(grupo_id);
CREATE INDEX IF NOT EXISTS idx_tareas_grupo ON tareas(grupo_id);
CREATE INDEX IF NOT EXISTS idx_tareas_estado ON tareas(estado);
CREATE UNIQUE INDEX IF NOT EXISTS idx_invitaciones_pendientes_email_grupo
ON invitaciones(grupo_id, email_invitado)
WHERE estado = 'Pendiente';
