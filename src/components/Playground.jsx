import { useState } from "react";
import { Play, Copy, Trash2 } from "lucide-react";

function Playground() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const runPrompt = async () => {
    if (prompt.trim() === "") {
      alert("Please enter a prompt.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/v1/prompts/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          persona: "AI Assistant",
          context: "Playground Testing",
          task: prompt,
          constraints: "Professional response",
          output_format: "Plain Text",
        }),
      });

      const data = await res.json();

      if (data.structured_prompt) {
        setResponse(data.structured_prompt);
      } else {
        setResponse(JSON.stringify(data, null, 2));
      }
    } catch (error) {
      setResponse("Unable to connect to backend.");
    }

    setLoading(false);
  };

  const copyResponse = () => {
    navigator.clipboard.writeText(response);
    alert("Copied");
  };

  const clearAll = () => {
    setPrompt("");
    setResponse("");
  };

  return (
    <div
      style={{
        padding: "40px",
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          fontSize: "38px",
          marginBottom: "10px",
        }}
      >
        Prompt Playground
      </h1>

      <p
        style={{
          color: "#64748b",
          marginBottom: "30px",
        }}
      >
        Test prompts instantly with the Prompt Engineering Toolkit.
      </p>

      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0px 5px 15px rgba(0,0,0,.08)",
        }}
      >
        <label
          style={{
            fontWeight: "bold",
          }}
        >
          Prompt
        </label>

        <textarea
          rows="8"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your prompt..."
          style={{
            width: "100%",
            marginTop: "10px",
            padding: "15px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            fontSize: "16px",
            resize: "vertical",
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
            onClick={runPrompt}
            style={{
              background: "#4f46e5",
              color: "white",
              padding: "12px 25px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Play size={18} />
            {loading ? "Running..." : "Run Prompt"}
          </button>

          <button
            onClick={copyResponse}
            style={{
              background: "#10b981",
              color: "white",
              padding: "12px 25px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Copy size={18} />
            Copy
          </button>

          <button
            onClick={clearAll}
            style={{
              background: "#ef4444",
              color: "white",
              padding: "12px 25px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Trash2 size={18} />
            Clear
          </button>
        </div>
      </div>

      <div
        style={{
          marginTop: "35px",
          background: "white",
          borderRadius: "12px",
          padding: "25px",
          boxShadow: "0px 5px 15px rgba(0,0,0,.08)",
        }}
      >
        <h2>Generated Response</h2>

        <textarea
          value={response}
          readOnly
          rows="14"
          style={{
            width: "100%",
            marginTop: "15px",
            padding: "15px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            fontSize: "15px",
            background: "#f9fafb",
          }}
        />
      </div>
    </div>
  );
}

export default Playground;