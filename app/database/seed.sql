INSERT OR IGNORE INTO usuarios (id, nombre, email, password_hash, rol)
VALUES (
    1,
    'Usuario Demo',
    'demo@brenotask.local',
    'c8fb65753e7fa5be4556530e205c7ec45c88369ccd0358e46bfde660c546c593',
    'Administrador'
);

INSERT OR IGNORE INTO grupos (id, nombre, descripcion, creado_por)
VALUES
    (1, 'Casa Breñosa', 'Grupo familiar de prueba para organizar tareas del hogar.', 1),
    (2, 'Proyecto Universidad', 'Grupo de ejemplo para coordinar entregas compartidas.', 1);

INSERT OR IGNORE INTO miembros_grupo (id, usuario_id, grupo_id, rol)
VALUES
    (1, 1, 1, 'Administrador'),
    (2, 1, 2, 'Miembro Administrador');

INSERT OR IGNORE INTO tareas (id, grupo_id, titulo, descripcion, fecha, hora_inicio, hora_fin, estado, creado_por)
VALUES
    (1, 1, 'Revisar compra semanal', 'Preparar la lista compartida antes del fin de semana.', '2026-06-12', '10:00', '11:00', 'Programada', 1),
    (2, 1, 'Organizar limpieza', 'Coordinar turnos para las zonas comunes.', '2026-06-13', '09:00', '10:30', 'Programada', 1),
    (3, 2, 'Preparar entrega de diseño', 'Revisar materiales antes de la siguiente reunion.', '2026-06-14', '17:00', '18:00', 'Programada', 1);
