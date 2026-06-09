import React, { useEffect, useState } from "react";

import { getCurrentUser, login, logout } from "./api/auth";
import { createGroup, deleteGroup, getGroups, inviteUser, updateGroup } from "./api/groups";


const SESSION_TOKEN_KEY = "brenotask_session_token";

const ESTADO_LABELS = {
  SESION_CERRADA: "Sesión cerrada",
  SISTEMA_DISPONIBLE: "Sesión activa",
  GRUPOS_ABIERTO: "Grupos disponibles",
  GRUPO_ABIERTO: "Grupo abierto",
  INVITACION_ABIERTA: "Invitación abierta",
};

const ROLES_GESTION_GRUPO = new Set(["Administrador", "Miembro Administrador"]);
const ROLES_ELIMINAR_GRUPO = new Set(["Administrador"]);


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
  onCancelLogout,
  onConfirmLogout,
  onCreateGroup,
  onDeleteGroup,
  onInviteUser,
  onRequestLogout,
  onUpdateGroup,
  usuario,
}) {
  const [filtroGrupos, setFiltroGrupos] = useState("");
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
  const [invitacionEmail, setInvitacionEmail] = useState("");
  const [invitacionRol, setInvitacionRol] = useState("Miembro");
  const [invitacionFechaLimite, setInvitacionFechaLimite] = useState("");
  const [invitarUsuarioError, setInvitarUsuarioError] = useState("");
  const [invitarUsuarioMensaje, setInvitarUsuarioMensaje] = useState("");
  const gruposFiltrados = grupos.filter((grupo) =>
    grupo.nombre.toLowerCase().includes(filtroGrupos.trim().toLowerCase()),
  );

  async function handleCreateGroup(event) {
    event.preventDefault();
    setCrearGrupoError("");
    setCrearGrupoMensaje("");
    setEditarGrupoMensaje("");
    setEliminarGrupoMensaje("");
    setInvitarUsuarioMensaje("");

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
    setGrupoConfirmandoEliminarId(null);
    setGrupoInvitandoFormularioId(null);
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
    setGrupoInvitandoFormularioId(null);
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
  }

  function cancelInviteUser() {
    setGrupoInvitandoFormularioId(null);
    setInvitacionEmail("");
    setInvitacionRol("Miembro");
    setInvitacionFechaLimite("");
    setInvitarUsuarioError("");
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
  const [grupoCreando, setGrupoCreando] = useState(false);
  const [grupoActualizandoId, setGrupoActualizandoId] = useState(null);
  const [grupoEliminandoId, setGrupoEliminandoId] = useState(null);
  const [grupoInvitandoId, setGrupoInvitandoId] = useState(null);
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
      } catch {
        localStorage.removeItem(SESSION_TOKEN_KEY);
        if (active) {
          setToken(null);
          setUsuario(null);
          setEstado("SESION_CERRADA");
          setGrupos([]);
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
      setEstado(result.estado);
      setGestionMensaje(result.mensaje);
      return result;
    } finally {
      setGrupoEliminandoId(null);
    }
  }

  async function handleInviteUser(groupId, invitationInput) {
    setGrupoInvitandoId(groupId);

    try {
      const result = await inviteUser(token, groupId, invitationInput);
      setEstado(result.estado);
      setGestionMensaje(result.mensaje);
      return result;
    } finally {
      setGrupoInvitandoId(null);
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
      setGrupoCreando(false);
      setGrupoActualizandoId(null);
      setGrupoEliminandoId(null);
      setGrupoInvitandoId(null);
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
          onCancelLogout={cancelLogout}
          onConfirmLogout={confirmLogout}
          onCreateGroup={handleCreateGroup}
          onDeleteGroup={handleDeleteGroup}
          onInviteUser={handleInviteUser}
          onRequestLogout={requestLogout}
          onUpdateGroup={handleUpdateGroup}
          usuario={usuario}
        />
      ) : (
        <LoginForm loading={loading} onLogin={handleLogin} />
      )}
    </main>
  );
}
