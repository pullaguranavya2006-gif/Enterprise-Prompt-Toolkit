const API_BASE_URL = "http://127.0.0.1:8000/api/v1";

export async function generatePrompt(promptData) {
  const response = await fetch(
    `${API_BASE_URL}/prompts/generate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(promptData),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to generate prompt");
  }

  return response.json();
}

export async function getSavedPrompts() {
  const response = await fetch(`${API_BASE_URL}/prompts`);

  if (!response.ok) {
    throw new Error("Failed to load prompts");
  }

  return response.json();
}

export async function deletePrompt(id) {
  const response = await fetch(
    `${API_BASE_URL}/prompts/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete prompt");
  }

  return true;
}