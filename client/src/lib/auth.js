// Lightweight client-side auth "store" so pages can be built and navigated
// before a real backend exists. Swap the bodies of these functions for real
// API calls (fetch/axios) once the backend is ready — the function
// signatures are designed to not need to change.

const STORAGE_KEY = "chatapp_user";

export function getCurrentUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function loginUser({ email }) {
  // TODO: replace with a real API call, e.g.
  // const res = await axiosInstance.post("/auth/login", { email, password });
  const user = {
    email,
    name: email.split("@")[0],
    bio: "",
    avatarColor: "bg-purple-500",
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  return user;
}

export function signupUser({ email }) {
  // TODO: replace with a real API call, e.g.
  // const res = await axiosInstance.post("/auth/signup", { email, password });
  return loginUser({ email });
}

export function updateUser(updates) {
  const current = getCurrentUser() || {};
  const updated = { ...current, ...updates };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export function logoutUser() {
  localStorage.removeItem(STORAGE_KEY);
}
