const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000/api";


async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
    ...options,
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    const message = body?.detail?.message ?? "No se pudo completar la operación.";
    throw new Error(message);
  }

  return response.json();
}


export function getGroups(token) {
  return request("/groups", {
    headers: {
      "X-Session-Token": token,
    },
  });
}

