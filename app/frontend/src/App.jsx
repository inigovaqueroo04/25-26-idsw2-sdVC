import React, { useEffect, useState } from "react";

import { getCurrentUser, login, logout } from "./api/auth";
import { createGroup, getGroups } from "./api/groups";


const SESSION_TOKEN_KEY = "brenotask_session_token";

const ESTADO_LABELS = {
  SESION_CERRADA: "Sesión cerrada",
  SISTEMA_DISPONIBLE: "Sesión activa",
  GRUPOS_ABIERTO: "Grupos disponibles",
  GRUPO_ABIERTO: "Grupo abierto",
};


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
  onCancelLogout,
  onConfirmLogout,
  onCreateGroup,
  onRequestLogout,
  usuario,
}) {
  const [filtroGrupos, setFiltroGrupos] = useState("");
  const [grupoNombre, setGrupoNombre] = useState("");
  const [grupoDescripcion, setGrupoDescripcion] = useState("");
  const [crearGrupoError, setCrearGrupoError] = useState("");
  const [crearGrupoMensaje, setCrearGrupoMensaje] = useState("");
  const gruposFiltrados = grupos.filter((grupo) =>
    grupo.nombre.toLowerCase().includes(filtroGrupos.trim().toLowerCase()),
  );

  async function handleCreateGroup(event) {
    event.preventDefault();
    setCrearGrupoError("");
    setCrearGrupoMensaje("");

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

        {gruposLoading ? <p className="subtle">Cargando grupos...</p> : null}
        {gruposError ? <p className="error" role="alert">{gruposError}</p> : null}

        {!gruposLoading && !gruposError && gruposFiltrados.length === 0 ? (
          <p className="empty-state">No hay grupos que mostrar.</p>
        ) : null}

        {!gruposLoading && !gruposError && gruposFiltrados.length > 0 ? (
          <div className="groups-grid">
            {gruposFiltrados.map((grupo) => (
              <article className="group-card" key={grupo.id}>
                <div>
                  <h3>{grupo.nombre}</h3>
                  <p>{grupo.descripcion ?? "Sin descripción."}</p>
                </div>
                <div className="group-meta">
                  <span>{grupo.rol}</span>
                  <span>
                    {grupo.numero_miembros} miembro{grupo.numero_miembros === 1 ? "" : "s"}
                  </span>
                </div>
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
          onCancelLogout={cancelLogout}
          onConfirmLogout={confirmLogout}
          onCreateGroup={handleCreateGroup}
          onRequestLogout={requestLogout}
          usuario={usuario}
        />
      ) : (
        <LoginForm loading={loading} onLogin={handleLogin} />
      )}
    </main>
  );
}
