import { API_BASE } from "../lib/constants";
import { handleResponse } from "../lib/handleReponse";

// ✅ Get current user
export async function fetchCurrentUser() {
  const res = await fetch(`${API_BASE}/auth/me`, {
    credentials: "include",
  });
  return handleResponse(res);
}

// ✅ Login (server sets HttpOnly cookie)
export async function loginUser(credentials) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(credentials),
  });
  return handleResponse(res);
}

// ✅ Logout (clears cookie)
export async function logoutUser() {
  const res = await fetch(`${API_BASE}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  return handleResponse(res);
}

// ✅ Register
export async function registerUser(data) {
  const res = await fetch(`${API_BASE}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}
