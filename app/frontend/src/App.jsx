import React, { useEffect, useState } from "react";

import { getCurrentUser, login, logout } from "./api/auth";


const SESSION_TOKEN_KEY = "brenotask_session_token";

const ESTADO_LABELS = {
  SESION_CERRADA: "Sesión cerrada",
  SISTEMA_DISPONIBLE: "Sesión activa",
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
  onCancelLogout,
  onConfirmLogout,
  onRequestLogout,
  usuario,
}) {
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
    </section>
  );
}


export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem(SESSION_TOKEN_KEY));
  const [estado, setEstado] = useState(token ? "SISTEMA_DISPONIBLE" : "SESION_CERRADA");
  const [gestionMensaje, setGestionMensaje] = useState("Todo listo. Has iniciado sesión correctamente.");
  const [confirmingLogout, setConfirmingLogout] = useState(false);
  const [loading, setLoading] = useState(Boolean(token));

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
        setEstado("SISTEMA_DISPONIBLE");
      } catch {
        localStorage.removeItem(SESSION_TOKEN_KEY);
        if (active) {
          setToken(null);
          setUsuario(null);
          setEstado("SESION_CERRADA");
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
    setEstado(result.estado);
    setGestionMensaje("Todo listo. Has iniciado sesión correctamente.");
    setConfirmingLogout(false);
    setLoading(false);
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
          onCancelLogout={cancelLogout}
          onConfirmLogout={confirmLogout}
          onRequestLogout={requestLogout}
          usuario={usuario}
        />
      ) : (
        <LoginForm loading={loading} onLogin={handleLogin} />
      )}
    </main>
  );
}
