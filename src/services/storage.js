export function savePrompt(promptData) {
  const prompts =
    JSON.parse(localStorage.getItem("promptforge_prompts")) || [];

  const newPrompt = {
    id: Date.now(),

    title:
      promptData.title || "Untitled Prompt",

    prompt:
      promptData.prompt || "",

    category:
      promptData.category || "General",

    qualityScore:
      promptData.qualityScore || "8.5",

    createdAt:
      new Date().toLocaleString(),
  };

  prompts.unshift(newPrompt);

  localStorage.setItem(
    "promptforge_prompts",
    JSON.stringify(prompts)
  );

  return newPrompt;
}

export function getPrompts() {
  return (
    JSON.parse(
      localStorage.getItem("promptforge_prompts")
    ) || []
  );
}

export function deletePrompt(id) {
  const prompts = getPrompts().filter(
    (prompt) => prompt.id !== id
  );

  localStorage.setItem(
    "promptforge_prompts",
    JSON.stringify(prompts)
  );
}

export function updatePrompt(updatedPrompt) {
  const prompts = getPrompts().map((prompt) =>
    prompt.id === updatedPrompt.id
      ? updatedPrompt
      : prompt
  );

  localStorage.setItem(
    "promptforge_prompts",
    JSON.stringify(prompts)
  );
}