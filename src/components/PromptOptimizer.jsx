import { useState } from "react";
import { Wand2, Copy, RotateCcw } from "lucide-react";

function PromptOptimizer() {
  const [originalPrompt, setOriginalPrompt] = useState("");
  const [optimizedPrompt, setOptimizedPrompt] = useState("");

  const optimizePrompt = () => {
    if (originalPrompt.trim() === "") {
      alert("Please enter a prompt.");
      return;
    }

    const optimized = `You are an expert AI assistant.

Task:
${originalPrompt}

Instructions:
• Think step by step.
• Provide accurate information.
• Be concise.
• Use bullet points wherever possible.
• Do not make assumptions.
• Explain clearly.
• Return the response in professional language.

End of Prompt.`;

    setOptimizedPrompt(optimized);
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(optimizedPrompt);
    alert("Optimized Prompt Copied");
  };

  const clearPrompt = () => {
    setOriginalPrompt("");
    setOptimizedPrompt("");
  };

  return (
    <div
      style={{
        padding: "40px",
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <h1>⚡ Prompt Optimizer</h1>

      <p
        style={{
          color: "#64748b",
          marginBottom: "25px",
        }}
      >
        Improve weak prompts into professional AI prompts.
      </p>

      <div
        style={{
          background: "#fff",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 5px 15px rgba(0,0,0,.08)",
        }}
      >
        <h3>Original Prompt</h3>

        <textarea
          rows="8"
          value={originalPrompt}
          onChange={(e) =>
            setOriginalPrompt(e.target.value)
          }
          placeholder="Enter your prompt..."
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "15px",
          }}
        />

        <div
          style={{
            display: "flex",
            gap: "15px",
            marginTop: "20px",
          }}
        >
          <button
            onClick={optimizePrompt}
            style={{
              background: "#4f46e5",
              color: "white",
              border: "none",
              padding: "12px 22px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            <Wand2 size={18} />
            Optimize
          </button>

          <button
            onClick={copyPrompt}
            style={{
              background: "#10b981",
              color: "white",
              border: "none",
              padding: "12px 22px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            <Copy size={18} />
            Copy
          </button>

          <button
            onClick={clearPrompt}
            style={{
              background: "#ef4444",
              color: "white",
              border: "none",
              padding: "12px 22px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            <RotateCcw size={18} />
            Clear
          </button>
        </div>
      </div>

      <div
        style={{
          background: "#fff",
          marginTop: "30px",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 5px 15px rgba(0,0,0,.08)",
        }}
      >
        <h3>Optimized Prompt</h3>

        <textarea
          readOnly
          rows="12"
          value={optimizedPrompt}
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            background: "#f8fafc",
            fontSize: "15px",
          }}
        />
      </div>
    </div>
  );
}

export default PromptOptimizer;