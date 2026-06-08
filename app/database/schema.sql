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

CREATE INDEX IF NOT EXISTS idx_grupos_creado_por ON grupos(creado_por);
CREATE INDEX IF NOT EXISTS idx_miembros_grupo_usuario ON miembros_grupo(usuario_id);
CREATE INDEX IF NOT EXISTS idx_miembros_grupo_grupo ON miembros_grupo(grupo_id);
