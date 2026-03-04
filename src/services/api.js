// filepath: src/services/api.js

const BASE = "http://localhost:3001/api";

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

export const api = {
  // Auth
  login: (credentials) =>
    request("/auth/login", { method: "POST", body: JSON.stringify(credentials) }),
  logout: () => request("/auth/logout", { method: "POST" }),
  getMe: () => request("/auth/me"),

  // Portfolio (public)
  getPortfolio: () => request("/portfolio"),

  // Portfolio (admin)
  updateHero: (data) =>
    request("/portfolio/hero", { method: "PUT", body: JSON.stringify(data) }),
  updateAbout: (data) =>
    request("/portfolio/about", { method: "PUT", body: JSON.stringify(data) }),

  // Skills
  addSkill: (data) =>
    request("/portfolio/skills", { method: "POST", body: JSON.stringify(data) }),
  updateSkill: (id, data) =>
    request(`/portfolio/skills/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteSkill: (id) =>
    request(`/portfolio/skills/${id}`, { method: "DELETE" }),

  // Projects
  addProject: (data) =>
    request("/portfolio/projects", { method: "POST", body: JSON.stringify(data) }),
  updateProject: (id, data) =>
    request(`/portfolio/projects/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteProject: (id) =>
    request(`/portfolio/projects/${id}`, { method: "DELETE" }),

  // Experience
  addExperience: (data) =>
    request("/portfolio/experience", { method: "POST", body: JSON.stringify(data) }),
  updateExperience: (id, data) =>
    request(`/portfolio/experience/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteExperience: (id) =>
    request(`/portfolio/experience/${id}`, { method: "DELETE" }),
};
