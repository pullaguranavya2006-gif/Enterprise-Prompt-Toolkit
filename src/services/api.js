import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export default api;

/* ---------------- Prompt Builder ---------------- */

export async function createPrompt(data) {
  const response = await api.post("/prompts", data);
  return response.data;
}

export async function getPrompts() {
  const response = await api.get("/prompts");
  return response.data;
}

export async function deletePrompt(id) {
  const response = await api.delete(`/prompts/${id}`);
  return response.data;
}

/* ---------------- Optimizer ---------------- */

export async function optimizePrompt(prompt) {
  const response = await api.post("/optimizer", {
    prompt,
  });
  return response.data;
}

/* ---------------- Evaluator ---------------- */

export async function evaluatePrompt(prompt) {
  const response = await api.post("/evaluate", {
    prompt,
  });
  return response.data;
}

/* ---------------- Model Comparison ---------------- */

export async function compareModels(prompt) {
  const response = await api.post("/compare-models", {
    prompt,
  });
  return response.data;
}

/* ---------------- Version History ---------------- */

export async function getVersions(promptId = null) {
  if (promptId) {
    const response = await api.get(`/versions/${promptId}`);
    return response.data;
  }

  const response = await api.get("/versions");
  return response.data;
}

/* ---------------- Analytics ---------------- */

export async function getAnalytics() {
  const response = await api.get("/analytics");
  return response.data;
}

/* ---------------- Settings ---------------- */

export async function getSettings() {
  const response = await api.get("/settings");
  return response.data;
}

export async function saveSettings(settings) {
  const response = await api.post("/settings", settings);
  return response.data;
}

/* ---------------- Authentication ---------------- */

export async function register(data) {
  const response = await api.post("/register", data);
  return response.data;
}

export async function login(data) {
  const response = await api.post("/login", data);
  return response.data;
}

/* ---------------- Export ---------------- */

export async function exportPrompt(id) {
  const response = await api.get(`/export/${id}`);
  return response.data;
}

/* ---------------- Dashboard ---------------- */

export async function getDashboard() {
  const response = await api.get("/dashboard");
  return response.data;
}