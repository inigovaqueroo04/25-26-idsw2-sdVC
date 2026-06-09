const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000/api";


async function request(path, options = {}) {
  const { headers, ...requestOptions } = options;

  const response = await fetch(`${API_URL}${path}`, {
    ...requestOptions,
    headers: {
      "Content-Type": "application/json",
      ...(headers ?? {}),
    },
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    const message = body?.detail?.message ?? "No se pudo completar la operacion.";
    throw new Error(message);
  }

  return response.json();
}


export function login(email, password) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}


export function logout(token) {
  return request("/auth/logout", {
    method: "POST",
    headers: {
      "X-Session-Token": token,
    },
  });
}


export function getCurrentUser(token) {
  return request("/auth/me", {
    headers: {
      "X-Session-Token": token,
    },
  });
}
