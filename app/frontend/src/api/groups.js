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


export function getInvitations(token) {
  return request("/groups/invitations", {
    headers: {
      "X-Session-Token": token,
    },
  });
}


export function getGroupMembers(token, groupId) {
  return request(`/groups/${groupId}/members`, {
    headers: {
      "X-Session-Token": token,
    },
  });
}


export function createGroup(token, group) {
  return request("/groups", {
    body: JSON.stringify(group),
    headers: {
      "X-Session-Token": token,
    },
    method: "POST",
  });
}


export function updateGroup(token, groupId, group) {
  return request(`/groups/${groupId}`, {
    body: JSON.stringify(group),
    headers: {
      "X-Session-Token": token,
    },
    method: "PUT",
  });
}


export function updateGroupMember(token, groupId, memberId, memberUpdate) {
  return request(`/groups/${groupId}/members/${memberId}`, {
    body: JSON.stringify(memberUpdate),
    headers: {
      "X-Session-Token": token,
    },
    method: "PATCH",
  });
}


export function deleteGroupMember(token, groupId, memberId) {
  return request(`/groups/${groupId}/members/${memberId}`, {
    headers: {
      "X-Session-Token": token,
    },
    method: "DELETE",
  });
}


export function deleteGroup(token, groupId) {
  return request(`/groups/${groupId}`, {
    headers: {
      "X-Session-Token": token,
    },
    method: "DELETE",
  });
}


export function inviteUser(token, groupId, invitation) {
  return request(`/groups/${groupId}/invitations`, {
    body: JSON.stringify(invitation),
    headers: {
      "X-Session-Token": token,
    },
    method: "POST",
  });
}


export function updateInvitation(token, invitationId, invitationUpdate) {
  return request(`/groups/invitations/${invitationId}`, {
    body: JSON.stringify(invitationUpdate),
    headers: {
      "X-Session-Token": token,
    },
    method: "PATCH",
  });
}
