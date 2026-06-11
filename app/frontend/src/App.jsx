import React, { useEffect, useState } from "react";

import { getCurrentUser, login, logout } from "./api/auth";
import {
  createGroup,
  deleteGroup,
  deleteGroupMember,
  getGroupMembers,
  getGroups,
  getInvitations,
  inviteUser,
  updateGroup,
  updateGroupMember,
  updateInvitation,
} from "./api/groups";
import { completeTask, createTask, deleteTask, getTasks, updateTask } from "./api/tasks";


const SESSION_TOKEN_KEY = "brenotask_session_token";

const ESTADO_LABELS = {
  SESION_CERRADA: "Sesión cerrada",
  SISTEMA_DISPONIBLE: "Sesión activa",
  GRUPOS_ABIERTO: "Grupos disponibles",
  GRUPO_ABIERTO: "Grupo abierto",
  TAREAS_ABIERTO: "Tareas abiertas",
  TAREA_ABIERTO: "Tarea abierta",
  INVITACIONES_ABIERTO: "Invitaciones abiertas",
  INVITACION_ABIERTA: "Invitación abierta",
};

const ROLES_GESTION_GRUPO = new Set(["Administrador", "Miembro Administrador"]);
const ROLES_ELIMINAR_GRUPO = new Set(["Administrador"]);
const ESTADOS_TAREA_NO_EDITABLES = new Set(["Finalizada", "Cancelada"]);


function formatEstado(estado) {
  return ESTADO_LABELS[estado] ?? estado;
}


function LoginForm({ onLogin, loading }) {
  const [email, setEmail] = useState("demo@brenotask.local");
  const [password, setPassword] = useState("breno123");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Email y contraseña son obligatorios.");
      return;
    }

    try {
      await onLogin(email, password);
    } catch (loginError) {
      setError(loginError.message);
    }
  }

  return (
    <section className="login-panel" aria-labelledby="login-title">
      <div>
        <p className="eyebrow">Inicio de sesión</p>
        <h1 id="login-title">BreñoTask</h1>
        <p className="subtle">Accede a tu espacio de trabajo en BreñoTask.</p>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Email
          <input
            autoComplete="email"
            inputMode="email"
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            value={email}
          />
        </label>

        <label>
          Contraseña
          <input
            autoComplete="current-password"
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            value={password}
          />
        </label>

        {error ? <p className="error" role="alert">{error}</p> : null}

        <button className="primary-button" disabled={loading} type="submit">
          {loading ? "Iniciando..." : "Iniciar sesión"}
        </button>
      </form>
    </section>
  );
}


function Dashboard({
  confirmingLogout,
  estado,
  gestionMensaje,
  grupos,
  gruposError,
  gruposLoading,
  grupoCreando,
  grupoActualizandoId,
  grupoEliminandoId,
  grupoInvitandoId,
  grupoMiembrosLoadingId,
  invitaciones,
  invitacionesError,
  invitacionesLoading,
  invitacionActualizandoId,
  miembroActualizandoId,
  miembroEliminandoId,
  tareas,
  tareasError,
  tareasLoading,
  tareaActualizandoId,
  tareaCompletandoId,
  tareaCreando,
  tareaEliminandoId,
  onCancelLogout,
  onCompleteTask,
  onConfirmLogout,
  onCreateTask,
  onDeleteTask,
  onCreateGroup,
  onDeleteGroup,
  onDeleteGroupMember,
  onLoadGroupMembers,
  onUpdateInvitation,
  onInviteUser,
  onRequestLogout,
  onUpdateTask,
  onUpdateGroup,
  onUpdateGroupMember,
  usuario,
}) {
  const [filtroGrupos, setFiltroGrupos] = useState("");
  const [filtroTareas, setFiltroTareas] = useState("");
  const [filtroTareasEstado, setFiltroTareasEstado] = useState("Todas");
  const [filtroTareasGrupo, setFiltroTareasGrupo] = useState("Todos");
  const [tareaGrupoId, setTareaGrupoId] = useState("");
  const [tareaTitulo, setTareaTitulo] = useState("");
  const [tareaDescripcion, setTareaDescripcion] = useState("");
  const [tareaFecha, setTareaFecha] = useState("");
  const [tareaHoraInicio, setTareaHoraInicio] = useState("");
  const [tareaHoraFin, setTareaHoraFin] = useState("");
  const [crearTareaError, setCrearTareaError] = useState("");
  const [crearTareaMensaje, setCrearTareaMensaje] = useState("");
  const [tareaEditandoId, setTareaEditandoId] = useState(null);
  const [tareaEditadaTitulo, setTareaEditadaTitulo] = useState("");
  const [tareaEditadaDescripcion, setTareaEditadaDescripcion] = useState("");
  const [tareaEditadaFecha, setTareaEditadaFecha] = useState("");
  const [tareaEditadaHoraInicio, setTareaEditadaHoraInicio] = useState("");
  const [tareaEditadaHoraFin, setTareaEditadaHoraFin] = useState("");
  const [tareaEditadaAsignadoUsuarioId, setTareaEditadaAsignadoUsuarioId] = useState("");
  const [tareaEditadaLocalizacion, setTareaEditadaLocalizacion] = useState("");
  const [tareaEditadaRecordatorioMinutos, setTareaEditadaRecordatorioMinutos] = useState("");
  const [editarTareaError, setEditarTareaError] = useState("");
  const [editarTareaMensaje, setEditarTareaMensaje] = useState("");
  const [completarTareaError, setCompletarTareaError] = useState("");
  const [completarTareaMensaje, setCompletarTareaMensaje] = useState("");
  const [tareaConfirmandoEliminarId, setTareaConfirmandoEliminarId] = useState(null);
  const [eliminarTareaError, setEliminarTareaError] = useState("");
  const [eliminarTareaMensaje, setEliminarTareaMensaje] = useState("");
  const [grupoNombre, setGrupoNombre] = useState("");
  const [grupoDescripcion, setGrupoDescripcion] = useState("");
  const [crearGrupoError, setCrearGrupoError] = useState("");
  const [crearGrupoMensaje, setCrearGrupoMensaje] = useState("");
  const [grupoEditandoId, setGrupoEditandoId] = useState(null);
  const [grupoEditadoNombre, setGrupoEditadoNombre] = useState("");
  const [grupoEditadoDescripcion, setGrupoEditadoDescripcion] = useState("");
  const [editarGrupoError, setEditarGrupoError] = useState("");
  const [editarGrupoMensaje, setEditarGrupoMensaje] = useState("");
  const [grupoConfirmandoEliminarId, setGrupoConfirmandoEliminarId] = useState(null);
  const [eliminarGrupoError, setEliminarGrupoError] = useState("");
  const [eliminarGrupoMensaje, setEliminarGrupoMensaje] = useState("");
  const [grupoInvitandoFormularioId, setGrupoInvitandoFormularioId] = useState(null);
  const [grupoMiembrosAbiertoId, setGrupoMiembrosAbiertoId] = useState(null);
  const [miembrosPorGrupo, setMiembrosPorGrupo] = useState({});
  const [miembroRolesEditados, setMiembroRolesEditados] = useState({});
  const [miembroConfirmandoEliminarId, setMiembroConfirmandoEliminarId] = useState(null);
  const [editarMiembroError, setEditarMiembroError] = useState("");
  const [editarMiembroMensaje, setEditarMiembroMensaje] = useState("");
  const [invitacionEmail, setInvitacionEmail] = useState("");
  const [invitacionRol, setInvitacionRol] = useState("Miembro");
  const [invitacionFechaLimite, setInvitacionFechaLimite] = useState("");
  const [invitarUsuarioError, setInvitarUsuarioError] = useState("");
  const [invitarUsuarioMensaje, setInvitarUsuarioMensaje] = useState("");
  const [editarInvitacionError, setEditarInvitacionError] = useState("");
  const [editarInvitacionMensaje, setEditarInvitacionMensaje] = useState("");
  const [invitacionConfirmandoCancelarId, setInvitacionConfirmandoCancelarId] = useState(null);
  const [filtroInvitacionesEstado, setFiltroInvitacionesEstado] = useState("Pendiente");
  const gruposFiltrados = grupos.filter((grupo) =>
    grupo.nombre.toLowerCase().includes(filtroGrupos.trim().toLowerCase()),
  );
  const invitacionesFiltradas = invitaciones.filter((invitacion) =>
    filtroInvitacionesEstado === "Todas" ? true : invitacion.estado === filtroInvitacionesEstado,
  );
  const gruposTareas = [...new Map(tareas.map((tarea) => [tarea.grupo_id, tarea.grupo_nombre])).entries()]
    .map(([id, nombre]) => ({ id, nombre }))
    .sort((firstGroup, secondGroup) =>
      firstGroup.nombre.localeCompare(secondGroup.nombre, "es", { sensitivity: "base" }),
    );
  const gruposGestionTareas = grupos.filter((grupo) => ROLES_GESTION_GRUPO.has(grupo.rol));
  const tareasFiltradas = tareas.filter((tarea) => {
    const texto = `${tarea.titulo} ${tarea.descripcion ?? ""} ${tarea.grupo_nombre}`.toLowerCase();
    const coincideTexto = texto.includes(filtroTareas.trim().toLowerCase());
    const coincideEstado = filtroTareasEstado === "Todas" || tarea.estado === filtroTareasEstado;
    const coincideGrupo = filtroTareasGrupo === "Todos" || String(tarea.grupo_id) === filtroTareasGrupo;
    return coincideTexto && coincideEstado && coincideGrupo;
  });

  useEffect(() => {
    if (!tareaGrupoId && gruposGestionTareas.length > 0) {
      setTareaGrupoId(String(gruposGestionTareas[0].id));
    }
  }, [gruposGestionTareas, tareaGrupoId]);

  async function handleCreateTask(event) {
    event.preventDefault();
    setCrearTareaError("");
    setCrearTareaMensaje("");
    setEditarTareaMensaje("");
    setCompletarTareaMensaje("");

    if (!tareaGrupoId || !tareaTitulo.trim() || !tareaFecha || !tareaHoraInicio || !tareaHoraFin) {
      setCrearTareaError("Grupo, titulo, fecha, hora de inicio y hora de fin son obligatorios.");
      return;
    }

    try {
      const result = await onCreateTask({
        grupo_id: Number(tareaGrupoId),
        titulo: tareaTitulo,
        descripcion: tareaDescripcion,
        fecha: tareaFecha,
        hora_inicio: tareaHoraInicio,
        hora_fin: tareaHoraFin,
      });
      setTareaTitulo("");
      setTareaDescripcion("");
      setTareaFecha("");
      setTareaHoraInicio("");
      setTareaHoraFin("");
      setCrearTareaMensaje(result.mensaje);
    } catch (taskError) {
      setCrearTareaError(taskError.message);
    }
  }

  async function startEditTask(tarea) {
    setTareaEditandoId(tarea.id);
    setTareaEditadaTitulo(tarea.titulo);
    setTareaEditadaDescripcion(tarea.descripcion ?? "");
    setTareaEditadaFecha(tarea.fecha ?? "");
    setTareaEditadaHoraInicio(tarea.hora_inicio ?? "");
    setTareaEditadaHoraFin(tarea.hora_fin ?? "");
    setTareaEditadaAsignadoUsuarioId(tarea.asignado_usuario_id ? String(tarea.asignado_usuario_id) : "");
    setTareaEditadaLocalizacion(tarea.localizacion ?? "");
    setTareaEditadaRecordatorioMinutos(
      tarea.recordatorio_minutos || tarea.recordatorio_minutos === 0 ? String(tarea.recordatorio_minutos) : "",
    );
    setEditarTareaError("");
    setEditarTareaMensaje("");
    setCompletarTareaMensaje("");
    setCrearTareaMensaje("");

    if (!miembrosPorGrupo[tarea.grupo_id]) {
      try {
        const result = await onLoadGroupMembers(tarea.grupo_id);
        setMiembrosPorGrupo((currentMembers) => ({
          ...currentMembers,
          [tarea.grupo_id]: result.miembros,
        }));
      } catch (membersError) {
        setEditarTareaError(membersError.message);
      }
    }
  }

  function cancelEditTask() {
    setTareaEditandoId(null);
    setTareaEditadaTitulo("");
    setTareaEditadaDescripcion("");
    setTareaEditadaFecha("");
    setTareaEditadaHoraInicio("");
    setTareaEditadaHoraFin("");
    setTareaEditadaAsignadoUsuarioId("");
    setTareaEditadaLocalizacion("");
    setTareaEditadaRecordatorioMinutos("");
    setEditarTareaError("");
  }

  async function handleUpdateTask(event) {
    event.preventDefault();
    setEditarTareaError("");
    setEditarTareaMensaje("");

    if (
      !tareaEditadaTitulo.trim() ||
      !tareaEditadaFecha ||
      !tareaEditadaHoraInicio ||
      !tareaEditadaHoraFin
    ) {
      setEditarTareaError("Titulo, fecha, hora de inicio y hora de fin son obligatorios.");
      return;
    }

    try {
      const result = await onUpdateTask(tareaEditandoId, {
        titulo: tareaEditadaTitulo,
        descripcion: tareaEditadaDescripcion,
        fecha: tareaEditadaFecha,
        hora_inicio: tareaEditadaHoraInicio,
        hora_fin: tareaEditadaHoraFin,
        asignado_usuario_id: tareaEditadaAsignadoUsuarioId ? Number(tareaEditadaAsignadoUsuarioId) : null,
        localizacion: tareaEditadaLocalizacion,
        recordatorio_minutos: tareaEditadaRecordatorioMinutos ? Number(tareaEditadaRecordatorioMinutos) : null,
      });
      cancelEditTask();
      setEditarTareaMensaje(result.mensaje);
    } catch (taskError) {
      setEditarTareaError(taskError.message);
    }
  }

  function requestDeleteTask(taskId) {
    setTareaConfirmandoEliminarId(taskId);
    setEliminarTareaError("");
    setEliminarTareaMensaje("");
    setEditarTareaMensaje("");
    setCompletarTareaMensaje("");
    setCrearTareaMensaje("");
  }

  function cancelDeleteTask() {
    setTareaConfirmandoEliminarId(null);
    setEliminarTareaError("");
  }

  async function handleDeleteTask(taskId) {
    setEliminarTareaError("");
    setEliminarTareaMensaje("");

    try {
      const result = await onDeleteTask(taskId);
      setTareaConfirmandoEliminarId(null);
      setEliminarTareaMensaje(result.mensaje);
    } catch (taskError) {
      setEliminarTareaError(taskError.message);
    }
  }

  async function handleCompleteTask(taskId) {
    setCompletarTareaError("");
    setCompletarTareaMensaje("");
    setEditarTareaMensaje("");
    setEliminarTareaMensaje("");

    try {
      const result = await onCompleteTask(taskId);
      setCompletarTareaMensaje(result.mensaje);
    } catch (taskError) {
      setCompletarTareaError(taskError.message);
    }
  }

  async function handleCreateGroup(event) {
    event.preventDefault();
    setCrearGrupoError("");
    setCrearGrupoMensaje("");
    setEditarGrupoMensaje("");
    setEliminarGrupoMensaje("");
    setInvitarUsuarioMensaje("");
    setEditarMiembroMensaje("");

    if (!grupoNombre.trim()) {
      setCrearGrupoError("El nombre del grupo es obligatorio.");
      return;
    }

    try {
      const result = await onCreateGroup({
        nombre: grupoNombre,
        descripcion: grupoDescripcion,
      });
      setGrupoNombre("");
      setGrupoDescripcion("");
      setCrearGrupoMensaje(result.mensaje);
    } catch (createError) {
      setCrearGrupoError(createError.message);
    }
  }

  function startEditGroup(grupo) {
    setGrupoEditandoId(grupo.id);
    setGrupoEditadoNombre(grupo.nombre);
    setGrupoEditadoDescripcion(grupo.descripcion ?? "");
    setEditarGrupoError("");
    setEditarGrupoMensaje("");
    setCrearGrupoMensaje("");
    setEliminarGrupoMensaje("");
    setInvitarUsuarioMensaje("");
    setEditarMiembroMensaje("");
    setGrupoConfirmandoEliminarId(null);
    setGrupoInvitandoFormularioId(null);
    setGrupoMiembrosAbiertoId(null);
  }

  function cancelEditGroup() {
    setGrupoEditandoId(null);
    setGrupoEditadoNombre("");
    setGrupoEditadoDescripcion("");
    setEditarGrupoError("");
  }

  async function handleUpdateGroup(event, grupoId) {
    event.preventDefault();
    setEditarGrupoError("");
    setEditarGrupoMensaje("");

    if (!grupoEditadoNombre.trim()) {
      setEditarGrupoError("El nombre del grupo es obligatorio.");
      return;
    }

    try {
      const result = await onUpdateGroup(grupoId, {
        nombre: grupoEditadoNombre,
        descripcion: grupoEditadoDescripcion,
      });
      setGrupoEditandoId(null);
      setGrupoEditadoNombre("");
      setGrupoEditadoDescripcion("");
      setEditarGrupoMensaje(result.mensaje);
    } catch (updateError) {
      setEditarGrupoError(updateError.message);
    }
  }

  function requestDeleteGroup(grupoId) {
    setGrupoConfirmandoEliminarId(grupoId);
    setEliminarGrupoError("");
    setEliminarGrupoMensaje("");
    setEditarGrupoMensaje("");
    setCrearGrupoMensaje("");
    setInvitarUsuarioMensaje("");
    setEditarMiembroMensaje("");
    setMiembroConfirmandoEliminarId(null);
    setGrupoInvitandoFormularioId(null);
    setGrupoMiembrosAbiertoId(null);
  }

  function cancelDeleteGroup() {
    setGrupoConfirmandoEliminarId(null);
    setEliminarGrupoError("");
  }

  async function confirmDeleteGroup(grupoId) {
    setEliminarGrupoError("");
    setEliminarGrupoMensaje("");

    try {
      const result = await onDeleteGroup(grupoId);
      setGrupoConfirmandoEliminarId(null);
      setEliminarGrupoMensaje(result.mensaje);
    } catch (deleteError) {
      setEliminarGrupoError(deleteError.message);
    }
  }

  function startInviteUser(grupoId) {
    setGrupoInvitandoFormularioId(grupoId);
    setGrupoConfirmandoEliminarId(null);
    setGrupoEditandoId(null);
    setInvitacionEmail("");
    setInvitacionRol("Miembro");
    setInvitacionFechaLimite("");
    setInvitarUsuarioError("");
    setInvitarUsuarioMensaje("");
    setCrearGrupoMensaje("");
    setEditarGrupoMensaje("");
    setEliminarGrupoMensaje("");
    setEditarMiembroMensaje("");
    setGrupoMiembrosAbiertoId(null);
  }

  function cancelInviteUser() {
    setGrupoInvitandoFormularioId(null);
    setInvitacionEmail("");
    setInvitacionRol("Miembro");
    setInvitacionFechaLimite("");
    setInvitarUsuarioError("");
  }

  async function toggleGroupMembers(grupoId) {
    setEditarMiembroError("");
    setEditarMiembroMensaje("");
    setMiembroConfirmandoEliminarId(null);
    setGrupoInvitandoFormularioId(null);
    setGrupoConfirmandoEliminarId(null);
    setGrupoEditandoId(null);

    if (grupoMiembrosAbiertoId === grupoId) {
      setGrupoMiembrosAbiertoId(null);
      return;
    }

    setGrupoMiembrosAbiertoId(grupoId);

    if (miembrosPorGrupo[grupoId]) {
      return;
    }

    try {
      const result = await onLoadGroupMembers(grupoId);
      setMiembrosPorGrupo((currentMembers) => ({
        ...currentMembers,
        [grupoId]: result.miembros,
      }));
      setMiembroRolesEditados((currentRoles) => ({
        ...currentRoles,
        ...Object.fromEntries(result.miembros.map((miembro) => [miembro.id, miembro.rol])),
      }));
    } catch (membersError) {
      setEditarMiembroError(membersError.message);
    }
  }

  function handleMemberRoleDraft(memberId, rol) {
    setMiembroRolesEditados((currentRoles) => ({
      ...currentRoles,
      [memberId]: rol,
    }));
  }

  async function handleUpdateMemberRole(grupoId, memberId, rolSeleccionado) {
    setEditarMiembroError("");
    setEditarMiembroMensaje("");

    try {
      const result = await onUpdateGroupMember(grupoId, memberId, rolSeleccionado);
      setMiembrosPorGrupo((currentMembers) => ({
        ...currentMembers,
        [grupoId]: (currentMembers[grupoId] ?? []).map((miembro) =>
          miembro.id === result.miembro.id ? result.miembro : miembro,
        ),
      }));
      setMiembroRolesEditados((currentRoles) => ({
        ...currentRoles,
        [result.miembro.id]: result.miembro.rol,
      }));
      setEditarMiembroMensaje(result.mensaje);
    } catch (memberError) {
      setEditarMiembroError(memberError.message);
    }
  }

  function requestDeleteMember(memberId) {
    setMiembroConfirmandoEliminarId(memberId);
    setEditarMiembroError("");
    setEditarMiembroMensaje("");
  }

  function cancelDeleteMember() {
    setMiembroConfirmandoEliminarId(null);
    setEditarMiembroError("");
  }

  async function confirmDeleteMember(grupoId, memberId) {
    setEditarMiembroError("");
    setEditarMiembroMensaje("");

    try {
      const result = await onDeleteGroupMember(grupoId, memberId);
      setMiembrosPorGrupo((currentMembers) => ({
        ...currentMembers,
        [grupoId]: (currentMembers[grupoId] ?? []).filter((miembro) => miembro.id !== result.miembro_id),
      }));
      setMiembroRolesEditados((currentRoles) => {
        const nextRoles = { ...currentRoles };
        delete nextRoles[result.miembro_id];
        return nextRoles;
      });
      setMiembroConfirmandoEliminarId(null);
      setEditarMiembroMensaje(result.mensaje);
    } catch (memberError) {
      setEditarMiembroError(memberError.message);
    }
  }

  async function handleInviteUser(event, grupoId) {
    event.preventDefault();
    setInvitarUsuarioError("");
    setInvitarUsuarioMensaje("");

    if (!invitacionEmail.trim() || !invitacionFechaLimite) {
      setInvitarUsuarioError("Email y fecha limite son obligatorios.");
      return;
    }

    try {
      const result = await onInviteUser(grupoId, {
        email: invitacionEmail,
        rol: invitacionRol,
        fecha_limite: invitacionFechaLimite,
      });
      setGrupoInvitandoFormularioId(null);
      setInvitacionEmail("");
      setInvitacionRol("Miembro");
      setInvitacionFechaLimite("");
      setInvitarUsuarioMensaje(result.mensaje);
    } catch (inviteError) {
      setInvitarUsuarioError(inviteError.message);
    }
  }

  async function handleUpdateInvitation(invitationId, estadoDestino) {
    setEditarInvitacionError("");
    setEditarInvitacionMensaje("");
    setInvitarUsuarioMensaje("");

    try {
      const result = await onUpdateInvitation(invitationId, estadoDestino);
      setInvitacionConfirmandoCancelarId(null);
      setEditarInvitacionMensaje(result.mensaje);
    } catch (invitationError) {
      setEditarInvitacionError(invitationError.message);
    }
  }

  function requestCancelInvitation(invitationId) {
    setInvitacionConfirmandoCancelarId(invitationId);
    setEditarInvitacionError("");
    setEditarInvitacionMensaje("");
  }

  function cancelCancelInvitation() {
    setInvitacionConfirmandoCancelarId(null);
    setEditarInvitacionError("");
  }

  return (
    <section className="workspace" aria-labelledby="dashboard-title">
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">{formatEstado(estado)}</p>
          <h1 id="dashboard-title">Bienvenido a BreñoTask, {usuario.nombre}</h1>
        </div>
        <button className="secondary-button" type="button" onClick={onRequestLogout}>
          Cerrar sesión
        </button>
      </header>

      {confirmingLogout ? (
        <div className="logout-confirmation" role="alert">
          <p>Confirmar cierre de sesión actual.</p>
          <div className="confirmation-actions">
            <button className="secondary-button" type="button" onClick={onCancelLogout}>
              Cancelar
            </button>
            <button
              className="primary-button compact"
              data-testid="confirm-logout"
              type="button"
              onClick={onConfirmLogout}
            >
              Confirmar cierre
            </button>
          </div>
        </div>
      ) : null}

      <div className="status-grid">
        <article className="status-item">
          <span>Usuario</span>
          <strong>{usuario.email}</strong>
        </article>
        <article className="status-item">
          <span>Rol</span>
          <strong>{usuario.rol}</strong>
        </article>
        <article className="status-item">
          <span>Estado</span>
          <strong>{formatEstado(estado)}</strong>
        </article>
      </div>

      <div className="navigation-band">
        <div>
          <h2>Panel principal</h2>
          <p>{gestionMensaje}</p>
        </div>
      </div>

      <section className="groups-section" aria-labelledby="groups-title">
        <div className="section-header">
          <div>
            <p className="eyebrow">Gestión de grupos</p>
            <h2 id="groups-title">Mis grupos</h2>
          </div>
          <label className="filter-field">
            Buscar grupo
            <input
              onChange={(event) => setFiltroGrupos(event.target.value)}
              placeholder="Filtrar por nombre"
              type="search"
              value={filtroGrupos}
            />
          </label>
        </div>

        <form className="create-group-form" onSubmit={handleCreateGroup}>
          <div className="create-group-fields">
            <label>
              Nombre
              <input
                maxLength={80}
                onChange={(event) => setGrupoNombre(event.target.value)}
                type="text"
                value={grupoNombre}
              />
            </label>

            <label>
              Descripción
              <input
                maxLength={160}
                onChange={(event) => setGrupoDescripcion(event.target.value)}
                type="text"
                value={grupoDescripcion}
              />
            </label>
          </div>

          <div className="create-group-actions">
            <button className="primary-button" disabled={grupoCreando} type="submit">
              {grupoCreando ? "Creando..." : "Crear grupo"}
            </button>
          </div>

          {crearGrupoError ? <p className="error" role="alert">{crearGrupoError}</p> : null}
          {crearGrupoMensaje ? <p className="success" role="status">{crearGrupoMensaje}</p> : null}
        </form>

        {editarGrupoMensaje ? <p className="success" role="status">{editarGrupoMensaje}</p> : null}
        {eliminarGrupoMensaje ? <p className="success" role="status">{eliminarGrupoMensaje}</p> : null}
        {eliminarGrupoError ? <p className="error" role="alert">{eliminarGrupoError}</p> : null}
        {invitarUsuarioMensaje ? <p className="success" role="status">{invitarUsuarioMensaje}</p> : null}
        {invitarUsuarioError ? <p className="error" role="alert">{invitarUsuarioError}</p> : null}
        {editarMiembroMensaje ? <p className="success" role="status">{editarMiembroMensaje}</p> : null}
        {editarMiembroError ? <p className="error" role="alert">{editarMiembroError}</p> : null}

        {gruposLoading ? <p className="subtle">Cargando grupos...</p> : null}
        {gruposError ? <p className="error" role="alert">{gruposError}</p> : null}

        {!gruposLoading && !gruposError && gruposFiltrados.length === 0 ? (
          <p className="empty-state">No hay grupos que mostrar.</p>
        ) : null}

        {!gruposLoading && !gruposError && gruposFiltrados.length > 0 ? (
          <div className="groups-grid">
            {gruposFiltrados.map((grupo) => (
              <article className="group-card" key={grupo.id}>
                {grupoEditandoId === grupo.id ? (
                  <form className="edit-group-form" onSubmit={(event) => handleUpdateGroup(event, grupo.id)}>
                    <label>
                      Nombre
                      <input
                        maxLength={80}
                        onChange={(event) => setGrupoEditadoNombre(event.target.value)}
                        type="text"
                        value={grupoEditadoNombre}
                      />
                    </label>

                    <label>
                      Descripción
                      <input
                        maxLength={160}
                        onChange={(event) => setGrupoEditadoDescripcion(event.target.value)}
                        type="text"
                        value={grupoEditadoDescripcion}
                      />
                    </label>

                    {editarGrupoError ? <p className="error" role="alert">{editarGrupoError}</p> : null}

                    <div className="group-actions">
                      <button className="secondary-button compact" type="button" onClick={cancelEditGroup}>
                        Cancelar
                      </button>
                      <button
                        className="primary-button compact"
                        disabled={grupoActualizandoId === grupo.id}
                        type="submit"
                      >
                        {grupoActualizandoId === grupo.id ? "Guardando..." : "Guardar"}
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="group-card-header">
                      <div>
                        <h3>{grupo.nombre}</h3>
                        <p>{grupo.descripcion ?? "Sin descripción."}</p>
                      </div>
                      {ROLES_GESTION_GRUPO.has(grupo.rol) ? (
                        <div className="group-card-actions">
                          <button
                            className="secondary-button compact"
                            type="button"
                            onClick={() => startEditGroup(grupo)}
                          >
                            Editar
                          </button>
                          <button
                            className="secondary-button compact"
                            type="button"
                            onClick={() => startInviteUser(grupo.id)}
                          >
                            Invitar
                          </button>
                          <button
                            className="secondary-button compact"
                            disabled={grupoMiembrosLoadingId === grupo.id}
                            type="button"
                            onClick={() => toggleGroupMembers(grupo.id)}
                          >
                            {grupoMiembrosLoadingId === grupo.id ? "Cargando..." : "Miembros"}
                          </button>
                          {ROLES_ELIMINAR_GRUPO.has(grupo.rol) ? (
                            <button
                              className="danger-button compact"
                              type="button"
                              onClick={() => requestDeleteGroup(grupo.id)}
                            >
                              Eliminar
                            </button>
                          ) : null}
                        </div>
                      ) : null}
                    </div>

                    {grupoConfirmandoEliminarId === grupo.id ? (
                      <div className="delete-confirmation" role="alert">
                        <p>Confirmar eliminacion del grupo.</p>
                        <div className="group-actions">
                          <button className="secondary-button compact" type="button" onClick={cancelDeleteGroup}>
                            Cancelar
                          </button>
                          <button
                            className="danger-button compact"
                            disabled={grupoEliminandoId === grupo.id}
                            type="button"
                            onClick={() => confirmDeleteGroup(grupo.id)}
                          >
                            {grupoEliminandoId === grupo.id ? "Eliminando..." : "Confirmar"}
                          </button>
                        </div>
                      </div>
                    ) : null}

                    {grupoInvitandoFormularioId === grupo.id ? (
                      <form className="invite-user-form" onSubmit={(event) => handleInviteUser(event, grupo.id)}>
                        <label>
                          Email
                          <input
                            inputMode="email"
                            maxLength={120}
                            onChange={(event) => setInvitacionEmail(event.target.value)}
                            type="email"
                            value={invitacionEmail}
                          />
                        </label>

                        <div className="invite-user-fields">
                          <label>
                            Rol
                            <select
                              onChange={(event) => setInvitacionRol(event.target.value)}
                              value={invitacionRol}
                            >
                              <option value="Miembro">Miembro</option>
                              <option value="Miembro Administrador">Miembro Administrador</option>
                            </select>
                          </label>

                          <label>
                            Fecha limite
                            <input
                              onChange={(event) => setInvitacionFechaLimite(event.target.value)}
                              type="date"
                              value={invitacionFechaLimite}
                            />
                          </label>
                        </div>

                        <div className="group-actions">
                          <button className="secondary-button compact" type="button" onClick={cancelInviteUser}>
                            Cancelar
                          </button>
                          <button
                            className="primary-button compact"
                            disabled={grupoInvitandoId === grupo.id}
                            type="submit"
                          >
                            {grupoInvitandoId === grupo.id ? "Invitando..." : "Enviar"}
                          </button>
                        </div>
                      </form>
                    ) : null}

                    {grupoMiembrosAbiertoId === grupo.id ? (
                      <div className="members-panel">
                        {(miembrosPorGrupo[grupo.id] ?? []).length === 0 ? (
                          <p className="subtle">No hay miembros cargados.</p>
                        ) : null}

                        {(miembrosPorGrupo[grupo.id] ?? []).map((miembro) => (
                          <div className="member-row" key={miembro.id}>
                            <div>
                              <strong>{miembro.nombre}</strong>
                              <span>{miembro.email}</span>
                            </div>

                            <label>
                              Rol
                              <select
                                disabled={miembroEliminandoId === miembro.id}
                                onChange={(event) => handleMemberRoleDraft(miembro.id, event.target.value)}
                                value={miembroRolesEditados[miembro.id] ?? miembro.rol}
                              >
                                <option value="Administrador">Administrador</option>
                                <option value="Miembro Administrador">Miembro Administrador</option>
                                <option value="Miembro">Miembro</option>
                              </select>
                            </label>

                            <button
                              className="primary-button compact"
                              disabled={
                                miembroEliminandoId === miembro.id ||
                                miembroActualizandoId === miembro.id ||
                                (miembroRolesEditados[miembro.id] ?? miembro.rol) === miembro.rol
                              }
                              type="button"
                              onClick={(event) => {
                                const fila = event.currentTarget.closest(".member-row");
                                const rolSeleccionado =
                                  fila?.querySelector("select")?.value ?? miembroRolesEditados[miembro.id] ?? miembro.rol;
                                handleUpdateMemberRole(grupo.id, miembro.id, rolSeleccionado);
                              }}
                            >
                              {miembroActualizandoId === miembro.id ? "Guardando..." : "Guardar"}
                            </button>

                            <button
                              className="danger-button compact"
                              disabled={miembroActualizandoId === miembro.id || miembroEliminandoId === miembro.id}
                              type="button"
                              onClick={() => requestDeleteMember(miembro.id)}
                            >
                              Eliminar
                            </button>

                            {miembroConfirmandoEliminarId === miembro.id ? (
                              <div className="delete-confirmation member-delete-confirmation" role="alert">
                                <p>Confirmar eliminacion del miembro.</p>
                                <div className="group-actions">
                                  <button className="secondary-button compact" type="button" onClick={cancelDeleteMember}>
                                    Cancelar
                                  </button>
                                  <button
                                    className="danger-button compact"
                                    disabled={miembroEliminandoId === miembro.id}
                                    type="button"
                                    onClick={() => confirmDeleteMember(grupo.id, miembro.id)}
                                  >
                                    {miembroEliminandoId === miembro.id ? "Eliminando..." : "Confirmar"}
                                  </button>
                                </div>
                              </div>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    ) : null}

                    <div className="group-meta">
                      <span>{grupo.rol}</span>
                      <span>
                        {grupo.numero_miembros} miembro{grupo.numero_miembros === 1 ? "" : "s"}
                      </span>
                    </div>
                  </>
                )}
              </article>
            ))}
          </div>
        ) : null}
      </section>

      <section className="tasks-section" aria-labelledby="tasks-title">
        <div className="section-header">
          <div>
            <p className="eyebrow">Tareas</p>
            <h2 id="tasks-title">Mis tareas</h2>
          </div>
          <div className="tasks-filters">
            <label>
              Buscar
              <input
                onChange={(event) => setFiltroTareas(event.target.value)}
                type="search"
                value={filtroTareas}
              />
            </label>
            <label>
              Grupo
              <select
                onChange={(event) => setFiltroTareasGrupo(event.target.value)}
                value={filtroTareasGrupo}
              >
                <option value="Todos">Todos</option>
                {gruposTareas.map((grupo) => (
                  <option key={grupo.id} value={grupo.id}>
                    {grupo.nombre}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Estado
              <select
                onChange={(event) => setFiltroTareasEstado(event.target.value)}
                value={filtroTareasEstado}
              >
                <option value="Todas">Todas</option>
                <option value="Creada">Creadas</option>
                <option value="Programada">Programadas</option>
                <option value="En ejecucion">En ejecucion</option>
                <option value="Finalizada">Finalizadas</option>
                <option value="Cancelada">Canceladas</option>
              </select>
            </label>
          </div>
        </div>

        {gruposGestionTareas.length > 0 ? (
          <form className="create-task-form" onSubmit={handleCreateTask}>
            <div className="create-task-fields">
              <label>
                Grupo
                <select
                  onChange={(event) => setTareaGrupoId(event.target.value)}
                  value={tareaGrupoId}
                >
                  {gruposGestionTareas.map((grupo) => (
                    <option key={grupo.id} value={grupo.id}>
                      {grupo.nombre}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Titulo
                <input
                  maxLength={100}
                  onChange={(event) => setTareaTitulo(event.target.value)}
                  type="text"
                  value={tareaTitulo}
                />
              </label>

              <label>
                Fecha
                <input
                  onChange={(event) => setTareaFecha(event.target.value)}
                  type="date"
                  value={tareaFecha}
                />
              </label>

              <label>
                Inicio
                <input
                  onChange={(event) => setTareaHoraInicio(event.target.value)}
                  type="time"
                  value={tareaHoraInicio}
                />
              </label>

              <label>
                Fin
                <input
                  onChange={(event) => setTareaHoraFin(event.target.value)}
                  type="time"
                  value={tareaHoraFin}
                />
              </label>

              <label className="create-task-description">
                Descripcion
                <input
                  maxLength={180}
                  onChange={(event) => setTareaDescripcion(event.target.value)}
                  type="text"
                  value={tareaDescripcion}
                />
              </label>
            </div>

            {crearTareaError ? <p className="error" role="alert">{crearTareaError}</p> : null}
            {crearTareaMensaje ? <p className="success" role="status">{crearTareaMensaje}</p> : null}

            <div className="create-task-actions">
              <button className="primary-button compact" disabled={tareaCreando} type="submit">
                {tareaCreando ? "Creando..." : "Crear tarea"}
              </button>
            </div>
          </form>
        ) : null}

        {tareasLoading ? <p className="subtle">Cargando tareas...</p> : null}
        {tareasError ? <p className="error" role="alert">{tareasError}</p> : null}
        {editarTareaMensaje ? <p className="success" role="status">{editarTareaMensaje}</p> : null}
        {completarTareaMensaje ? <p className="success" role="status">{completarTareaMensaje}</p> : null}
        {completarTareaError ? <p className="error" role="alert">{completarTareaError}</p> : null}
        {eliminarTareaMensaje ? <p className="success" role="status">{eliminarTareaMensaje}</p> : null}
        {eliminarTareaError ? <p className="error" role="alert">{eliminarTareaError}</p> : null}

        {!tareasLoading && !tareasError && tareasFiltradas.length === 0 ? (
          <p className="empty-state">No hay tareas para este filtro.</p>
        ) : null}

        {!tareasLoading && !tareasError && tareasFiltradas.length > 0 ? (
          <div className="tasks-list">
            {tareasFiltradas.map((tarea) => (
              <article className="task-item" key={tarea.id}>
                {tareaEditandoId === tarea.id ? (
                  <form className="edit-task-form" onSubmit={handleUpdateTask}>
                    <div className="edit-task-fields">
                      <label>
                        Titulo
                        <input
                          maxLength={100}
                          onChange={(event) => setTareaEditadaTitulo(event.target.value)}
                          type="text"
                          value={tareaEditadaTitulo}
                        />
                      </label>

                      <label>
                        Fecha
                        <input
                          onChange={(event) => setTareaEditadaFecha(event.target.value)}
                          type="date"
                          value={tareaEditadaFecha}
                        />
                      </label>

                      <label>
                        Inicio
                        <input
                          onChange={(event) => setTareaEditadaHoraInicio(event.target.value)}
                          type="time"
                          value={tareaEditadaHoraInicio}
                        />
                      </label>

                      <label>
                        Fin
                        <input
                          onChange={(event) => setTareaEditadaHoraFin(event.target.value)}
                          type="time"
                          value={tareaEditadaHoraFin}
                        />
                      </label>

                      <label className="edit-task-description">
                        Descripcion
                        <input
                          maxLength={180}
                          onChange={(event) => setTareaEditadaDescripcion(event.target.value)}
                          type="text"
                          value={tareaEditadaDescripcion}
                        />
                      </label>

                      <label>
                        Responsable
                        <select
                          onChange={(event) => setTareaEditadaAsignadoUsuarioId(event.target.value)}
                          value={tareaEditadaAsignadoUsuarioId}
                        >
                          <option value="">Sin asignar</option>
                          {(miembrosPorGrupo[tarea.grupo_id] ?? []).map((miembro) => (
                            <option key={miembro.usuario_id} value={miembro.usuario_id}>
                              {miembro.nombre}
                            </option>
                          ))}
                        </select>
                      </label>

                      <label>
                        Recordatorio
                        <input
                          min="0"
                          max="10080"
                          onChange={(event) => setTareaEditadaRecordatorioMinutos(event.target.value)}
                          placeholder="Minutos"
                          type="number"
                          value={tareaEditadaRecordatorioMinutos}
                        />
                      </label>

                      <label className="edit-task-description">
                        Localizacion
                        <input
                          maxLength={180}
                          onChange={(event) => setTareaEditadaLocalizacion(event.target.value)}
                          type="text"
                          value={tareaEditadaLocalizacion}
                        />
                      </label>
                    </div>

                    {editarTareaError ? <p className="error" role="alert">{editarTareaError}</p> : null}

                    <div className="edit-task-actions">
                      <button className="secondary-button compact" type="button" onClick={cancelEditTask}>
                        Cancelar
                      </button>
                      <button
                        className="primary-button compact"
                        disabled={tareaActualizandoId === tarea.id}
                        type="submit"
                      >
                        {tareaActualizandoId === tarea.id ? "Guardando..." : "Guardar"}
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div>
                      <h3>{tarea.titulo}</h3>
                      <p>{tarea.descripcion ?? "Sin descripcion."}</p>
                    </div>
                    <div className="task-meta">
                      <span>{tarea.estado}</span>
                      {tarea.fecha ? <span>{tarea.fecha}</span> : null}
                      {tarea.hora_inicio && tarea.hora_fin ? (
                        <span>
                          {tarea.hora_inicio}-{tarea.hora_fin}
                        </span>
                      ) : null}
                      {tarea.fecha_finalizacion ? <span>Finalizada {tarea.fecha_finalizacion}</span> : null}
                      {tarea.asignado_nombre ? <span>Responsable {tarea.asignado_nombre}</span> : null}
                      {tarea.localizacion ? <span>{tarea.localizacion}</span> : null}
                      {tarea.recordatorio_minutos || tarea.recordatorio_minutos === 0 ? (
                        <span>Recordatorio {tarea.recordatorio_minutos} min</span>
                      ) : null}
                      <span>{tarea.grupo_nombre}</span>
                      <span>{tarea.rol_grupo}</span>
                      {tarea.es_gestionable ? <span>Gestionable</span> : null}
                    </div>
                    {!ESTADOS_TAREA_NO_EDITABLES.has(tarea.estado) ? (
                      <div className="task-actions">
                        <button
                          className="primary-button compact"
                          disabled={tareaCompletandoId === tarea.id}
                          type="button"
                          onClick={() => handleCompleteTask(tarea.id)}
                        >
                          {tareaCompletandoId === tarea.id ? "Completando..." : "Completar"}
                        </button>
                        {tarea.es_gestionable ? (
                          <>
                            <button
                              className="secondary-button compact"
                              type="button"
                              onClick={() => startEditTask(tarea)}
                            >
                              Editar
                            </button>
                            <button
                              className="danger-button compact"
                              disabled={tareaEliminandoId === tarea.id}
                              type="button"
                              onClick={() => requestDeleteTask(tarea.id)}
                            >
                              Eliminar
                            </button>
                          </>
                        ) : null}
                      </div>
                    ) : null}
                    {tareaConfirmandoEliminarId === tarea.id ? (
                      <div className="delete-confirmation task-delete-confirmation" role="alert">
                        <p>Confirmar eliminacion de la tarea.</p>
                        <div className="task-actions">
                          <button className="secondary-button compact" type="button" onClick={cancelDeleteTask}>
                            Cancelar
                          </button>
                          <button
                            className="danger-button compact"
                            disabled={tareaEliminandoId === tarea.id}
                            type="button"
                            onClick={() => handleDeleteTask(tarea.id)}
                          >
                            {tareaEliminandoId === tarea.id ? "Eliminando..." : "Confirmar"}
                          </button>
                        </div>
                      </div>
                    ) : null}
                  </>
                )}
              </article>
            ))}
          </div>
        ) : null}
      </section>

      <section className="invitations-section" aria-labelledby="invitations-title">
        <div className="section-header">
          <div>
            <p className="eyebrow">Invitaciones</p>
            <h2 id="invitations-title">Mis invitaciones</h2>
          </div>
          <label className="filter-field">
            Estado
            <select
              onChange={(event) => setFiltroInvitacionesEstado(event.target.value)}
              value={filtroInvitacionesEstado}
            >
              <option value="Pendiente">Pendientes</option>
              <option value="Aceptada">Aceptadas</option>
              <option value="Rechazada">Rechazadas</option>
              <option value="Caducada">Caducadas</option>
              <option value="Cancelada">Canceladas</option>
              <option value="Todas">Todas</option>
            </select>
          </label>
        </div>

        {invitacionesLoading ? <p className="subtle">Cargando invitaciones...</p> : null}
        {invitacionesError ? <p className="error" role="alert">{invitacionesError}</p> : null}
        {editarInvitacionMensaje ? <p className="success" role="status">{editarInvitacionMensaje}</p> : null}
        {editarInvitacionError ? <p className="error" role="alert">{editarInvitacionError}</p> : null}

        {!invitacionesLoading && !invitacionesError && invitacionesFiltradas.length === 0 ? (
          <p className="empty-state">No hay invitaciones para este filtro.</p>
        ) : null}

        {!invitacionesLoading && !invitacionesError && invitacionesFiltradas.length > 0 ? (
          <div className="invitations-list">
            {invitacionesFiltradas.map((invitacion) => (
              <article className="invitation-item" key={invitacion.id}>
                <div>
                  <h3>{invitacion.grupo_nombre}</h3>
                  <p>{invitacion.email}</p>
                </div>

                <div className="invitation-meta">
                  <span>{invitacion.estado}</span>
                  <span>{invitacion.rol}</span>
                  <span>Limite {invitacion.fecha_limite}</span>
                  {invitacion.es_destinatario ? <span>Recibida</span> : null}
                  {invitacion.es_gestionable ? <span>Gestionable</span> : null}
                </div>

                {invitacion.es_destinatario && invitacion.estado === "Pendiente" ? (
                  <div className="invitation-actions">
                    <button
                      className="secondary-button compact"
                      disabled={invitacionActualizandoId === invitacion.id}
                      type="button"
                      onClick={() => handleUpdateInvitation(invitacion.id, "Rechazada")}
                    >
                      {invitacionActualizandoId === invitacion.id ? "Guardando..." : "Rechazar"}
                    </button>
                    <button
                      className="primary-button compact"
                      disabled={invitacionActualizandoId === invitacion.id}
                      type="button"
                      onClick={() => handleUpdateInvitation(invitacion.id, "Aceptada")}
                    >
                      {invitacionActualizandoId === invitacion.id ? "Guardando..." : "Aceptar"}
                    </button>
                  </div>
                ) : null}

                {invitacion.es_gestionable && invitacion.estado === "Pendiente" ? (
                  <div className="invitation-actions">
                    <button
                      className="danger-button compact"
                      disabled={invitacionActualizandoId === invitacion.id}
                      type="button"
                      onClick={() => requestCancelInvitation(invitacion.id)}
                    >
                      Cancelar invitacion
                    </button>
                  </div>
                ) : null}

                {invitacionConfirmandoCancelarId === invitacion.id ? (
                  <div className="delete-confirmation invitation-cancel-confirmation" role="alert">
                    <p>Confirmar cancelacion de la invitacion.</p>
                    <div className="group-actions">
                      <button className="secondary-button compact" type="button" onClick={cancelCancelInvitation}>
                        Cancelar
                      </button>
                      <button
                        className="danger-button compact"
                        disabled={invitacionActualizandoId === invitacion.id}
                        type="button"
                        onClick={() => handleUpdateInvitation(invitacion.id, "Cancelada")}
                      >
                        {invitacionActualizandoId === invitacion.id ? "Cancelando..." : "Confirmar"}
                      </button>
                    </div>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        ) : null}
      </section>
    </section>
  );
}


export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem(SESSION_TOKEN_KEY));
  const [estado, setEstado] = useState(token ? "SISTEMA_DISPONIBLE" : "SESION_CERRADA");
  const [gestionMensaje, setGestionMensaje] = useState("Todo listo. Has iniciado sesión correctamente.");
  const [grupos, setGrupos] = useState([]);
  const [gruposError, setGruposError] = useState("");
  const [gruposLoading, setGruposLoading] = useState(false);
  const [invitaciones, setInvitaciones] = useState([]);
  const [invitacionesError, setInvitacionesError] = useState("");
  const [invitacionesLoading, setInvitacionesLoading] = useState(false);
  const [tareas, setTareas] = useState([]);
  const [tareasError, setTareasError] = useState("");
  const [tareasLoading, setTareasLoading] = useState(false);
  const [tareaActualizandoId, setTareaActualizandoId] = useState(null);
  const [tareaCompletandoId, setTareaCompletandoId] = useState(null);
  const [tareaCreando, setTareaCreando] = useState(false);
  const [tareaEliminandoId, setTareaEliminandoId] = useState(null);
  const [grupoCreando, setGrupoCreando] = useState(false);
  const [grupoActualizandoId, setGrupoActualizandoId] = useState(null);
  const [grupoEliminandoId, setGrupoEliminandoId] = useState(null);
  const [grupoInvitandoId, setGrupoInvitandoId] = useState(null);
  const [grupoMiembrosLoadingId, setGrupoMiembrosLoadingId] = useState(null);
  const [invitacionActualizandoId, setInvitacionActualizandoId] = useState(null);
  const [miembroActualizandoId, setMiembroActualizandoId] = useState(null);
  const [miembroEliminandoId, setMiembroEliminandoId] = useState(null);
  const [confirmingLogout, setConfirmingLogout] = useState(false);
  const [loading, setLoading] = useState(Boolean(token));

  async function cargarGrupos(sessionToken) {
    setGruposLoading(true);
    setGruposError("");

    try {
      const result = await getGroups(sessionToken);
      setGrupos(result.grupos);
      setEstado(result.estado);
      setGestionMensaje(result.mensaje);
    } catch (groupsError) {
      setGrupos([]);
      setGruposError(groupsError.message);
    } finally {
      setGruposLoading(false);
    }
  }

  async function cargarInvitaciones(sessionToken) {
    setInvitacionesLoading(true);
    setInvitacionesError("");

    try {
      const result = await getInvitations(sessionToken);
      setInvitaciones(result.invitaciones);
      setEstado(result.estado);
      setGestionMensaje(result.mensaje);
    } catch (invitationsError) {
      setInvitaciones([]);
      setInvitacionesError(invitationsError.message);
    } finally {
      setInvitacionesLoading(false);
    }
  }

  async function cargarTareas(sessionToken) {
    setTareasLoading(true);
    setTareasError("");

    try {
      const result = await getTasks(sessionToken);
      setTareas(result.tareas);
      setEstado(result.estado);
      setGestionMensaje(result.mensaje);
    } catch (tasksError) {
      setTareas([]);
      setTareasError(tasksError.message);
    } finally {
      setTareasLoading(false);
    }
  }

  useEffect(() => {
    let active = true;

    async function restoreSession() {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const currentUser = await getCurrentUser(token);
        if (!active) {
          return;
        }
        setUsuario(currentUser);
        await cargarGrupos(token);
        await cargarInvitaciones(token);
        await cargarTareas(token);
      } catch {
        localStorage.removeItem(SESSION_TOKEN_KEY);
        if (active) {
          setToken(null);
          setUsuario(null);
          setEstado("SESION_CERRADA");
          setGrupos([]);
          setInvitaciones([]);
          setTareas([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    restoreSession();

    return () => {
      active = false;
    };
  }, [token]);

  async function handleLogin(email, password) {
    setLoading(true);
    const result = await login(email, password);
    localStorage.setItem(SESSION_TOKEN_KEY, result.token);
    setToken(result.token);
    setUsuario(result.usuario);
    setGestionMensaje("Todo listo. Has iniciado sesión correctamente.");
    setConfirmingLogout(false);
    await cargarGrupos(result.token);
    await cargarInvitaciones(result.token);
    await cargarTareas(result.token);
    setLoading(false);
  }

  async function handleCreateGroup(groupInput) {
    setGrupoCreando(true);

    try {
      const result = await createGroup(token, groupInput);
      setGrupos((currentGroups) =>
        [...currentGroups, result.grupo].sort((firstGroup, secondGroup) =>
          firstGroup.nombre.localeCompare(secondGroup.nombre, "es", { sensitivity: "base" }),
        ),
      );
      setEstado(result.estado);
      setGestionMensaje(result.mensaje);
      return result;
    } finally {
      setGrupoCreando(false);
    }
  }

  async function handleCreateTask(taskInput) {
    setTareaCreando(true);

    try {
      const result = await createTask(token, taskInput);
      setTareas((currentTasks) =>
        [...currentTasks, result.tarea].sort((firstTask, secondTask) =>
          firstTask.titulo.localeCompare(secondTask.titulo, "es", { sensitivity: "base" }),
        ),
      );
      setEstado(result.estado);
      setGestionMensaje(result.mensaje);
      return result;
    } finally {
      setTareaCreando(false);
    }
  }

  async function handleUpdateTask(taskId, taskInput) {
    setTareaActualizandoId(taskId);

    try {
      const result = await updateTask(token, taskId, taskInput);
      setTareas((currentTasks) =>
        currentTasks.map((tarea) => (tarea.id === result.tarea.id ? result.tarea : tarea)),
      );
      setEstado(result.estado);
      setGestionMensaje(result.mensaje);
      return result;
    } finally {
      setTareaActualizandoId(null);
    }
  }

  async function handleCompleteTask(taskId) {
    setTareaCompletandoId(taskId);

    try {
      const result = await completeTask(token, taskId);
      setTareas((currentTasks) =>
        currentTasks.map((tarea) => (tarea.id === result.tarea.id ? result.tarea : tarea)),
      );
      setEstado(result.estado);
      setGestionMensaje(result.mensaje);
      return result;
    } finally {
      setTareaCompletandoId(null);
    }
  }

  async function handleDeleteTask(taskId) {
    setTareaEliminandoId(taskId);

    try {
      const result = await deleteTask(token, taskId);
      setTareas((currentTasks) => currentTasks.filter((tarea) => tarea.id !== result.tarea_id));
      setEstado(result.estado);
      setGestionMensaje(result.mensaje);
      return result;
    } finally {
      setTareaEliminandoId(null);
    }
  }

  async function handleUpdateGroup(groupId, groupInput) {
    setGrupoActualizandoId(groupId);

    try {
      const result = await updateGroup(token, groupId, groupInput);
      setGrupos((currentGroups) =>
        currentGroups
          .map((grupo) => (grupo.id === result.grupo.id ? result.grupo : grupo))
          .sort((firstGroup, secondGroup) =>
            firstGroup.nombre.localeCompare(secondGroup.nombre, "es", { sensitivity: "base" }),
          ),
      );
      setInvitaciones((currentInvitations) =>
        currentInvitations.map((invitacion) =>
          invitacion.grupo_id === result.grupo.id
            ? { ...invitacion, grupo_nombre: result.grupo.nombre }
            : invitacion,
        ),
      );
      setEstado(result.estado);
      setGestionMensaje(result.mensaje);
      return result;
    } finally {
      setGrupoActualizandoId(null);
    }
  }

  async function handleDeleteGroup(groupId) {
    setGrupoEliminandoId(groupId);

    try {
      const result = await deleteGroup(token, groupId);
      setGrupos((currentGroups) => currentGroups.filter((grupo) => grupo.id !== result.grupo_id));
      setInvitaciones((currentInvitations) =>
        currentInvitations.filter((invitacion) => invitacion.grupo_id !== result.grupo_id),
      );
      setTareas((currentTasks) => currentTasks.filter((tarea) => tarea.grupo_id !== result.grupo_id));
      setEstado(result.estado);
      setGestionMensaje(result.mensaje);
      return result;
    } finally {
      setGrupoEliminandoId(null);
    }
  }

  async function handleLoadGroupMembers(groupId) {
    setGrupoMiembrosLoadingId(groupId);

    try {
      const result = await getGroupMembers(token, groupId);
      setEstado(result.estado);
      setGestionMensaje(result.mensaje);
      return result;
    } finally {
      setGrupoMiembrosLoadingId(null);
    }
  }

  async function handleUpdateGroupMember(groupId, memberId, roleInput) {
    setMiembroActualizandoId(memberId);

    try {
      const result = await updateGroupMember(token, groupId, memberId, { rol: roleInput });
      await cargarGrupos(token);
      setEstado(result.estado);
      setGestionMensaje(result.mensaje);
      return result;
    } finally {
      setMiembroActualizandoId(null);
    }
  }

  async function handleDeleteGroupMember(groupId, memberId) {
    setMiembroEliminandoId(memberId);

    try {
      const result = await deleteGroupMember(token, groupId, memberId);
      await cargarGrupos(token);
      setEstado(result.estado);
      setGestionMensaje(result.mensaje);
      return result;
    } finally {
      setMiembroEliminandoId(null);
    }
  }

  async function handleInviteUser(groupId, invitationInput) {
    setGrupoInvitandoId(groupId);

    try {
      const result = await inviteUser(token, groupId, invitationInput);
      await cargarInvitaciones(token);
      setEstado(result.estado);
      setGestionMensaje(result.mensaje);
      return result;
    } finally {
      setGrupoInvitandoId(null);
    }
  }

  async function handleUpdateInvitation(invitationId, estadoDestino) {
    setInvitacionActualizandoId(invitationId);

    try {
      const result = await updateInvitation(token, invitationId, { estado: estadoDestino });
      setInvitaciones((currentInvitations) =>
        currentInvitations.map((invitacion) =>
          invitacion.id === result.invitacion.id ? result.invitacion : invitacion,
        ),
      );
      if (estadoDestino === "Aceptada") {
        await cargarGrupos(token);
        await cargarTareas(token);
      }
      setEstado(result.estado);
      setGestionMensaje(result.mensaje);
      return result;
    } finally {
      setInvitacionActualizandoId(null);
    }
  }

  function requestLogout() {
    setConfirmingLogout(true);
  }

  function cancelLogout() {
    setConfirmingLogout(false);
  }

  async function confirmLogout() {
    try {
      await logout(token);
    } finally {
      localStorage.removeItem(SESSION_TOKEN_KEY);
      setToken(null);
      setUsuario(null);
      setEstado("SESION_CERRADA");
      setGestionMensaje("Todo listo. Has iniciado sesión correctamente.");
      setGrupos([]);
      setGruposError("");
      setInvitaciones([]);
      setInvitacionesError("");
      setTareas([]);
      setTareasError("");
      setTareaActualizandoId(null);
      setTareaCompletandoId(null);
      setTareaCreando(false);
      setTareaEliminandoId(null);
      setGrupoCreando(false);
      setGrupoActualizandoId(null);
      setGrupoEliminandoId(null);
      setGrupoInvitandoId(null);
      setGrupoMiembrosLoadingId(null);
      setInvitacionActualizandoId(null);
      setMiembroActualizandoId(null);
      setMiembroEliminandoId(null);
      setTareasLoading(false);
      setConfirmingLogout(false);
    }
  }

  return (
    <main className="app-shell">
      {usuario ? (
        <Dashboard
          confirmingLogout={confirmingLogout}
          estado={estado}
          gestionMensaje={gestionMensaje}
          grupos={grupos}
          gruposError={gruposError}
          gruposLoading={gruposLoading}
          grupoCreando={grupoCreando}
          grupoActualizandoId={grupoActualizandoId}
          grupoEliminandoId={grupoEliminandoId}
          grupoInvitandoId={grupoInvitandoId}
          grupoMiembrosLoadingId={grupoMiembrosLoadingId}
          invitaciones={invitaciones}
          invitacionesError={invitacionesError}
          invitacionesLoading={invitacionesLoading}
          invitacionActualizandoId={invitacionActualizandoId}
          miembroActualizandoId={miembroActualizandoId}
          miembroEliminandoId={miembroEliminandoId}
          tareas={tareas}
          tareasError={tareasError}
          tareasLoading={tareasLoading}
          tareaActualizandoId={tareaActualizandoId}
          tareaCompletandoId={tareaCompletandoId}
          tareaCreando={tareaCreando}
          tareaEliminandoId={tareaEliminandoId}
          onCancelLogout={cancelLogout}
          onCompleteTask={handleCompleteTask}
          onConfirmLogout={confirmLogout}
          onCreateTask={handleCreateTask}
          onDeleteTask={handleDeleteTask}
          onCreateGroup={handleCreateGroup}
          onDeleteGroup={handleDeleteGroup}
          onDeleteGroupMember={handleDeleteGroupMember}
          onInviteUser={handleInviteUser}
          onLoadGroupMembers={handleLoadGroupMembers}
          onUpdateInvitation={handleUpdateInvitation}
          onRequestLogout={requestLogout}
          onUpdateTask={handleUpdateTask}
          onUpdateGroup={handleUpdateGroup}
          onUpdateGroupMember={handleUpdateGroupMember}
          usuario={usuario}
        />
      ) : (
        <LoginForm loading={loading} onLogin={handleLogin} />
      )}
    </main>
  );
}
