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
  SESION_CERRADA: "Sesion cerrada",
  SISTEMA_DISPONIBLE: "Sesion activa",
  GRUPOS_ABIERTO: "Grupos disponibles",
  GRUPO_ABIERTO: "Grupo abierto",
  TAREAS_ABIERTO: "Tareas abiertas",
  TAREA_ABIERTO: "Tarea abierta",
  INVITACIONES_ABIERTO: "Invitaciones abiertas",
  INVITACION_ABIERTA: "Invitacion abierta",
};

const ROLES_GESTION_GRUPO = new Set(["Administrador", "Miembro Administrador"]);
const ROLES_ELIMINAR_GRUPO = new Set(["Administrador"]);
const ESTADOS_TAREA_NO_EDITABLES = new Set(["Finalizada", "Cancelada"]);


function formatEstado(estado) {
  return ESTADO_LABELS[estado] ?? estado;
}

function horaAMinutos(hora) {
  if (!hora) {
    return null;
  }

  const [horas, minutos] = hora.split(":").map(Number);

  if (Number.isNaN(horas) || Number.isNaN(minutos)) {
    return null;
  }

  return horas * 60 + minutos;
}


function seSolapan(firstTask, secondTask) {
  if (
    !firstTask.fecha ||
    !secondTask.fecha ||
    firstTask.fecha !== secondTask.fecha ||
    ESTADOS_TAREA_NO_EDITABLES.has(firstTask.estado) ||
    ESTADOS_TAREA_NO_EDITABLES.has(secondTask.estado)
  ) {
    return false;
  }

  const firstStart = horaAMinutos(firstTask.hora_inicio);
  const firstEnd = horaAMinutos(firstTask.hora_fin);
  const secondStart = horaAMinutos(secondTask.hora_inicio);
  const secondEnd = horaAMinutos(secondTask.hora_fin);

  if ([firstStart, firstEnd, secondStart, secondEnd].some((value) => value === null)) {
    return false;
  }

  return firstStart < secondEnd && firstEnd > secondStart;
}


function buscarSolapes(tarea, tareas) {
  return tareas
    .filter((tareaComparada) => tareaComparada.id !== tarea.id && seSolapan(tarea, tareaComparada))
    .map((tareaComparada) => ({
      id: tareaComparada.id,
      titulo: tareaComparada.titulo,
      grupo_nombre: tareaComparada.grupo_nombre,
      hora_inicio: tareaComparada.hora_inicio,
      hora_fin: tareaComparada.hora_fin,
    }));
}


function combinarConflictos(tarea, tareas) {
  const conflictos = [...(tarea.conflictos_horario ?? []), ...buscarSolapes(tarea, tareas)];
  const vistos = new Set();

  return conflictos.filter((conflicto) => {
    const key = conflicto.id ?? `${conflicto.titulo}-${conflicto.hora_inicio}-${conflicto.hora_fin}`;

    if (vistos.has(key)) {
      return false;
    }

    vistos.add(key);
    return true;
  });
}


function LoginForm({ onLogin, loading }) {
  const [email, setEmail] = useState("demo@brenotask.local");
  const [password, setPassword] = useState("breno123");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Email y contrasena son obligatorios.");
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
        <p className="eyebrow">Inicio de sesion</p>
        <h1 id="login-title">BrenoTask</h1>
        <p className="subtle">Accede a tu espacio de trabajo en BrenoTask.</p>
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
          Contrasena
          <input
            autoComplete="current-password"
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            value={password}
          />
        </label>

        {error ? <p className="error" role="alert">{error}</p> : null}

        <button className="primary-button" disabled={loading} type="submit">
          {loading ? "Iniciando..." : "Iniciar sesion"}
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
  const [moduloActivo, setModuloActivo] = useState("inicio");
  const [filtroGrupos, setFiltroGrupos] = useState("");
  const [filtroTareas, setFiltroTareas] = useState("");
  const [filtroTareasEstado, setFiltroTareasEstado] = useState("Todas");
  const [filtroTareasGrupo, setFiltroTareasGrupo] = useState("Todos");
  const [filtroPlanificacion, setFiltroPlanificacion] = useState("Todas");
  const [tareaGrupoId, setTareaGrupoId] = useState("");
  const [tareaTitulo, setTareaTitulo] = useState("");
  const [tareaDescripcion, setTareaDescripcion] = useState("");
  const [tareaFecha, setTareaFecha] = useState("");
  const [tareaHoraInicio, setTareaHoraInicio] = useState("");
  const [tareaHoraFin, setTareaHoraFin] = useState("");
  const [tareaRecordatorioMinutos, setTareaRecordatorioMinutos] = useState("");
  const [crearTareaError, setCrearTareaError] = useState("");
  const [crearTareaMensaje, setCrearTareaMensaje] = useState("");
  const [solapesCrearTarea, setSolapesCrearTarea] = useState([]);
  const [tareaEditandoId, setTareaEditandoId] = useState(null);
  const [tareaEditadaTitulo, setTareaEditadaTitulo] = useState("");
  const [tareaEditadaDescripcion, setTareaEditadaDescripcion] = useState("");
  const [tareaEditadaFecha, setTareaEditadaFecha] = useState("");
  const [tareaEditadaHoraInicio, setTareaEditadaHoraInicio] = useState("");
  const [tareaEditadaHoraFin, setTareaEditadaHoraFin] = useState("");
  const [tareaEditadaAsignadoUsuarioId, setTareaEditadaAsignadoUsuarioId] = useState("");
  const [tareaEditadaLocalizacion, setTareaEditadaLocalizacion] = useState("");
  const [tareaEditadaRecordatorioMinutos, setTareaEditadaRecordatorioMinutos] = useState("");
  const [tareaEditadaPredecesoraId, setTareaEditadaPredecesoraId] = useState("");
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
  const tareasFiltradasConConflictos = tareasFiltradas.map((tarea) => ({
    ...tarea,
    conflictos_visibles: combinarConflictos(tarea, tareas),
  }));
  const tareasPlanificacionBase = tareasFiltradas
    .filter((tarea) => tarea.fecha && !ESTADOS_TAREA_NO_EDITABLES.has(tarea.estado))
    .map((tarea) => ({
      ...tarea,
      conflictos_visibles: combinarConflictos(tarea, tareas),
    }))
    .sort((firstTask, secondTask) =>
      `${firstTask.fecha} ${firstTask.hora_inicio ?? ""}`.localeCompare(
        `${secondTask.fecha} ${secondTask.hora_inicio ?? ""}`,
      ),
    );
  const tareasPlanificacion = tareasPlanificacionBase.filter((tarea) => {
    if (filtroPlanificacion === "Recordatorios") {
      return tarea.recordatorio_minutos || tarea.recordatorio_minutos === 0;
    }

    if (filtroPlanificacion === "Conflictos") {
      return tarea.conflictos_visibles.length > 0;
    }

    return true;
  });
  const resumenPlanificacion = {
    programadas: tareasPlanificacionBase.length,
    conResponsable: tareasPlanificacionBase.filter((tarea) => tarea.asignado_usuario_id).length,
    conRecordatorio: tareasPlanificacionBase.filter(
      (tarea) => tarea.recordatorio_minutos || tarea.recordatorio_minutos === 0,
    ).length,
    conDependencia: tareasPlanificacionBase.filter((tarea) => tarea.predecesora_tarea_id).length,
    conConflicto: tareasPlanificacionBase.filter((tarea) => tarea.conflictos_visibles.length > 0).length,
  };
  const tareasPendientes = tareas.filter((tarea) => !ESTADOS_TAREA_NO_EDITABLES.has(tarea.estado));
  const invitacionesPendientes = invitaciones.filter((invitacion) => invitacion.estado === "Pendiente");
  const gruposGestionables = grupos.filter((grupo) => ROLES_GESTION_GRUPO.has(grupo.rol));
  const resumenInicio = [
    {
      etiqueta: "Tareas pendientes",
      valor: tareasPendientes.length,
      detalle: `${resumenPlanificacion.conConflicto} solapes`,
      modulo: "tareas",
    },
    {
      etiqueta: "Grupos activos",
      valor: grupos.length,
      detalle: `${gruposGestionables.length} gestionables`,
      modulo: "grupos",
    },
    {
      etiqueta: "Invitaciones",
      valor: invitacionesPendientes.length,
      detalle: "pendientes de revisar",
      modulo: "invitaciones",
    },
    {
      etiqueta: "Planificacion",
      valor: resumenPlanificacion.programadas,
      detalle: `${resumenPlanificacion.conRecordatorio} con recordatorio`,
      modulo: "planificacion",
    },
  ];
  const tareasProximas = tareasPlanificacionBase.slice(0, 4);
  const tituloModulo = {
    inicio: "Inicio",
    sesion: "Sesion",
    grupos: "Grupos",
    invitaciones: "Invitaciones",
    tareas: "Tareas",
    planificacion: "Planificacion",
  }[moduloActivo];
  const descripcionModulo = {
    inicio: "Resumen de tareas, grupos e invitaciones.",
    sesion: "Datos de la cuenta activa.",
    grupos: "Organiza grupos, miembros e invitaciones.",
    invitaciones: "Revisa solicitudes pendientes.",
    tareas: "Crea, asigna y completa tareas.",
    planificacion: "Revisa horarios, avisos y solapes.",
  }[moduloActivo];

  useEffect(() => {
    if (!tareaGrupoId && gruposGestionTareas.length > 0) {
      setTareaGrupoId(String(gruposGestionTareas[0].id));
    }
  }, [gruposGestionTareas, tareaGrupoId]);

  useEffect(() => {
    setSolapesCrearTarea([]);
  }, [tareaGrupoId, tareaTitulo, tareaFecha, tareaHoraInicio, tareaHoraFin]);

  async function crearTareaDesdeFormulario({ ignorarSolapes = false } = {}) {
    setCrearTareaError("");
    setCrearTareaMensaje("");
    setEditarTareaMensaje("");
    setCompletarTareaMensaje("");
    setEliminarTareaMensaje("");

    if (!tareaGrupoId || !tareaTitulo.trim() || !tareaFecha || !tareaHoraInicio || !tareaHoraFin) {
      setCrearTareaError("Grupo, titulo, fecha, hora de inicio y hora de fin son obligatorios.");
      return;
    }

    const borradorTarea = {
      id: "nueva",
      grupo_id: Number(tareaGrupoId),
      grupo_nombre: grupos.find((grupo) => String(grupo.id) === tareaGrupoId)?.nombre ?? "",
      titulo: tareaTitulo,
      fecha: tareaFecha,
      hora_inicio: tareaHoraInicio,
      hora_fin: tareaHoraFin,
      estado: "Programada",
    };
    const solapes = buscarSolapes(borradorTarea, tareas);

    if (solapes.length > 0 && !ignorarSolapes) {
      setSolapesCrearTarea(solapes);
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
        recordatorio_minutos: tareaRecordatorioMinutos ? Number(tareaRecordatorioMinutos) : null,
      });
      setTareaTitulo("");
      setTareaDescripcion("");
      setTareaFecha("");
      setTareaHoraInicio("");
      setTareaHoraFin("");
      setTareaRecordatorioMinutos("");
      setSolapesCrearTarea([]);
      setCrearTareaMensaje(result.mensaje);
    } catch (taskError) {
      setCrearTareaError(taskError.message);
    }
  }

  async function handleCreateTask(event) {
    event.preventDefault();
    await crearTareaDesdeFormulario();
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
    setTareaEditadaPredecesoraId(tarea.predecesora_tarea_id ? String(tarea.predecesora_tarea_id) : "");
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
    setTareaEditadaPredecesoraId("");
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
        predecesora_tarea_id: tareaEditadaPredecesoraId ? Number(tareaEditadaPredecesoraId) : null,
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
          <p className="eyebrow">BrenoTask</p>
          <h1 id="dashboard-title">Hola, {usuario.nombre}</h1>
        </div>
        <button className="secondary-button" type="button" onClick={onRequestLogout}>
          Cerrar sesion
        </button>
      </header>

      {confirmingLogout ? (
        <div className="logout-confirmation" role="alert">
          <p>Confirmar cierre de sesion actual.</p>
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

      <div className="workspace-layout">
        <aside className="module-sidebar" aria-label="Navegacion principal">
          {[
            ["inicio", "Inicio"],
            ["sesion", "Sesion"],
            ["grupos", "Grupos"],
            ["invitaciones", "Invitaciones"],
            ["tareas", "Tareas"],
            ["planificacion", "Planificacion"],
          ].map(([modulo, etiqueta]) => (
            <button
              className={moduloActivo === modulo ? "module-nav-button active" : "module-nav-button"}
              key={modulo}
              type="button"
              onClick={() => setModuloActivo(modulo)}
            >
              {etiqueta}
            </button>
          ))}
        </aside>

        <main className="module-content" aria-labelledby="module-title">
          <div className="navigation-band">
            <div>
              <h2 id="module-title">{tituloModulo}</h2>
              <p>{descripcionModulo}</p>
            </div>
          </div>

          {moduloActivo === "inicio" ? (
            <section className="home-section" aria-labelledby="home-title">
              <div className="home-heading">
                <div>
                  <p className="eyebrow">Resumen operativo</p>
                  <h2 id="home-title">Trabajo de hoy</h2>
                </div>
                <button className="primary-button compact" type="button" onClick={() => setModuloActivo("tareas")}>
                  Nueva tarea
                </button>
              </div>

              <div className="overview-grid">
                {resumenInicio.map((item) => (
                  <button
                    className="overview-card"
                    key={item.etiqueta}
                    type="button"
                    onClick={() => setModuloActivo(item.modulo)}
                  >
                    <span>{item.etiqueta}</span>
                    <strong>{item.valor}</strong>
                    <small>{item.detalle}</small>
                  </button>
                ))}
              </div>

              <div className="home-panels">
                <section className="home-panel" aria-labelledby="next-tasks-title">
                  <div className="panel-heading">
                    <h3 id="next-tasks-title">Proximas tareas</h3>
                    <button className="text-button" type="button" onClick={() => setModuloActivo("planificacion")}>
                      Ver agenda
                    </button>
                  </div>
                  {tareasProximas.length > 0 ? (
                    <div className="compact-list">
                      {tareasProximas.map((tarea) => (
                        <div className="compact-row" key={tarea.id}>
                          <strong>{tarea.titulo}</strong>
                          <span>
                            {tarea.fecha} {tarea.hora_inicio && tarea.hora_fin ? `${tarea.hora_inicio}-${tarea.hora_fin}` : ""}
                          </span>
                          <small>{tarea.asignado_nombre ? `Responsable ${tarea.asignado_nombre}` : "Sin responsable"}</small>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="empty-state">No hay tareas planificadas.</p>
                  )}
                </section>

                <section className="home-panel" aria-labelledby="quick-actions-title">
                  <div className="panel-heading">
                    <h3 id="quick-actions-title">Acciones frecuentes</h3>
                  </div>
                  <div className="quick-actions">
                    <button className="secondary-button" type="button" onClick={() => setModuloActivo("grupos")}>
                      Gestionar grupos
                    </button>
                    <button className="secondary-button" type="button" onClick={() => setModuloActivo("invitaciones")}>
                      Revisar invitaciones
                    </button>
                    <button className="secondary-button" type="button" onClick={() => setModuloActivo("planificacion")}>
                      Revisar conflictos
                    </button>
                  </div>
                </section>
              </div>
            </section>
          ) : null}

          {moduloActivo === "sesion" ? (
            <section className="session-section" aria-labelledby="session-title">
              <div className="section-header">
                <div>
                  <p className="eyebrow">Sesion</p>
                  <h2 id="session-title">Datos de acceso</h2>
                </div>
              </div>
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
            </section>
          ) : null}

      {moduloActivo === "grupos" ? (
      <section className="groups-section" aria-labelledby="groups-title">
        <div className="section-header">
          <div>
            <p className="eyebrow">Gestion de grupos</p>
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
              Descripcion
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
                      Descripcion
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
                        <p>{grupo.descripcion ?? "Sin descripcion."}</p>
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
      ) : null}

      {moduloActivo === "tareas" || moduloActivo === "planificacion" ? (
      <section className="tasks-section" aria-labelledby="tasks-title">
        <div className="section-header">
          <div>
            <p className="eyebrow">{moduloActivo === "planificacion" ? "Planificacion" : "Tareas"}</p>
            <h2 id="tasks-title">{moduloActivo === "planificacion" ? "Agenda" : "Mis tareas"}</h2>
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

        {moduloActivo === "tareas" && gruposGestionTareas.length > 0 ? (
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

              <label>
                Recordatorio
                <input
                  min="0"
                  max="10080"
                  onChange={(event) => setTareaRecordatorioMinutos(event.target.value)}
                  placeholder="Minutos"
                  type="number"
                  value={tareaRecordatorioMinutos}
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

            {solapesCrearTarea.length > 0 ? (
              <div className="schedule-warning" role="alert">
                <div>
                  <strong>Horario solapado</strong>
                  <p>Ya hay tareas en ese tramo. Cambia fecha u hora, o crea la tarea igualmente.</p>
                </div>
                <div className="warning-list">
                  {solapesCrearTarea.map((solape) => (
                    <span key={solape.id}>
                      {solape.titulo} Â· {solape.grupo_nombre} Â· {solape.hora_inicio}-{solape.hora_fin}
                    </span>
                  ))}
                </div>
                <div className="create-task-actions">
                  <button
                    className="secondary-button compact"
                    type="button"
                    onClick={() => setSolapesCrearTarea([])}
                  >
                    Cambiar horario
                  </button>
                  <button
                    className="primary-button compact"
                    disabled={tareaCreando}
                    type="button"
                    onClick={() => crearTareaDesdeFormulario({ ignorarSolapes: true })}
                  >
                    Crear igualmente
                  </button>
                </div>
              </div>
            ) : null}

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
        {moduloActivo === "tareas" && editarTareaMensaje ? <p className="success" role="status">{editarTareaMensaje}</p> : null}
        {moduloActivo === "tareas" && completarTareaMensaje ? <p className="success" role="status">{completarTareaMensaje}</p> : null}
        {moduloActivo === "tareas" && completarTareaError ? <p className="error" role="alert">{completarTareaError}</p> : null}
        {moduloActivo === "tareas" && eliminarTareaMensaje ? <p className="success" role="status">{eliminarTareaMensaje}</p> : null}
        {moduloActivo === "tareas" && eliminarTareaError ? <p className="error" role="alert">{eliminarTareaError}</p> : null}

        {moduloActivo === "planificacion" && !tareasLoading && !tareasError ? (
          <div className="planning-panel" aria-labelledby="planning-title">
            <div className="planning-panel-header">
              <div>
                <p className="eyebrow">Planificacion</p>
                <h3 id="planning-title">Agenda</h3>
              </div>
              <div className="planning-stats">
                <span>{resumenPlanificacion.programadas} tareas</span>
                <span>{resumenPlanificacion.conResponsable} asignadas</span>
                <span>{resumenPlanificacion.conRecordatorio} avisos</span>
                <span>{resumenPlanificacion.conDependencia} dependencias</span>
                <span>{resumenPlanificacion.conConflicto} solapes</span>
              </div>
            </div>

            <div className="planning-filter-actions" aria-label="Filtro de planificacion">
              <button
                className={filtroPlanificacion === "Todas" ? "planning-filter active" : "planning-filter"}
                type="button"
                onClick={() => setFiltroPlanificacion("Todas")}
              >
                Todas
              </button>
              <button
                className={filtroPlanificacion === "Recordatorios" ? "planning-filter active" : "planning-filter"}
                type="button"
                onClick={() => setFiltroPlanificacion("Recordatorios")}
              >
                Recordatorios
              </button>
              <button
                className={filtroPlanificacion === "Conflictos" ? "planning-filter active" : "planning-filter"}
                type="button"
                onClick={() => setFiltroPlanificacion("Conflictos")}
              >
                Solapes
              </button>
            </div>

            {tareasPlanificacion.length > 0 ? (
              <div className="planning-list">
                {tareasPlanificacion.slice(0, 5).map((tarea) => (
                  <div className="planning-row" key={tarea.id}>
                    <strong>{tarea.titulo}</strong>
                    <span>{tarea.grupo_nombre}</span>
                    <span>
                      {tarea.fecha} {tarea.hora_inicio && tarea.hora_fin ? `${tarea.hora_inicio}-${tarea.hora_fin}` : ""}
                    </span>
                    <span>{tarea.asignado_nombre ? `Responsable ${tarea.asignado_nombre}` : "Sin responsable"}</span>
                    <span>
                      {tarea.recordatorio_minutos || tarea.recordatorio_minutos === 0
                        ? `Recordatorio ${tarea.recordatorio_minutos} min`
                        : "Sin recordatorio"}
                    </span>
                    <span>{tarea.predecesora_titulo ? `Depende de ${tarea.predecesora_titulo}` : "Sin dependencia"}</span>
                    <span className={tarea.conflictos_visibles.length > 0 ? "planning-alert" : ""}>
                      {tarea.conflictos_visibles.length > 0
                        ? `${tarea.conflictos_visibles.length} solape`
                        : "Sin solape"}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="subtle">No hay tareas planificadas para este filtro.</p>
            )}
          </div>
        ) : null}

        {moduloActivo === "tareas" && !tareasLoading && !tareasError && tareasFiltradas.length === 0 ? (
          <p className="empty-state">No hay tareas para este filtro.</p>
        ) : null}

        {moduloActivo === "tareas" && !tareasLoading && !tareasError && tareasFiltradas.length > 0 ? (
          <div className="tasks-list">
            {tareasFiltradasConConflictos.map((tarea) => (
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

                      <label>
                        Depende de
                        <select
                          onChange={(event) => setTareaEditadaPredecesoraId(event.target.value)}
                          value={tareaEditadaPredecesoraId}
                        >
                          <option value="">Sin dependencia</option>
                          {tareas
                            .filter(
                              (tareaCandidata) =>
                                tareaCandidata.grupo_id === tarea.grupo_id &&
                                tareaCandidata.id !== tarea.id &&
                                !ESTADOS_TAREA_NO_EDITABLES.has(tareaCandidata.estado),
                            )
                            .map((tareaCandidata) => (
                              <option key={tareaCandidata.id} value={tareaCandidata.id}>
                                {tareaCandidata.titulo}
                              </option>
                            ))}
                        </select>
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
                      <span>{tarea.asignado_nombre ? `Responsable ${tarea.asignado_nombre}` : "Sin responsable"}</span>
                      {tarea.localizacion ? <span>{tarea.localizacion}</span> : null}
                      {tarea.recordatorio_minutos || tarea.recordatorio_minutos === 0 ? (
                        <span>Recordatorio {tarea.recordatorio_minutos} min</span>
                      ) : null}
                      {tarea.predecesora_titulo ? <span>Depende de {tarea.predecesora_titulo}</span> : null}
                      {tarea.conflictos_visibles.length > 0 ? (
                        <span className="warning-pill">Solape {tarea.conflictos_visibles.length}</span>
                      ) : null}
                      <span>{tarea.grupo_nombre}</span>
                      <span>{tarea.rol_grupo}</span>
                      {tarea.es_gestionable ? <span>Gestionable</span> : null}
                    </div>
                    {tarea.conflictos_visibles.length > 0 ? (
                      <p className="task-warning" role="status">
                        Solapa con{" "}
                        {tarea.conflictos_visibles
                          .map((conflicto) =>
                            `${conflicto.titulo}${conflicto.grupo_nombre ? ` Â· ${conflicto.grupo_nombre}` : ""} (${conflicto.hora_inicio}-${conflicto.hora_fin})`
                          )
                          .join(", ")}
                        .
                      </p>
                    ) : null}
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
      ) : null}

      {moduloActivo === "invitaciones" ? (
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
      ) : null}
        </main>
      </div>
    </section>
  );
}


export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem(SESSION_TOKEN_KEY));
  const [estado, setEstado] = useState(token ? "SISTEMA_DISPONIBLE" : "SESION_CERRADA");
  const [gestionMensaje, setGestionMensaje] = useState("Todo listo. Has iniciado sesion correctamente.");
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
    setGestionMensaje("Todo listo. Has iniciado sesion correctamente.");
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
      await cargarTareas(token);
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
      setGestionMensaje("Todo listo. Has iniciado sesion correctamente.");
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
