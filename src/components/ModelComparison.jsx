import { useState } from "react";
import { compareModels } from "../services/api";

function ModelComparison() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleCompare() {
    if (!prompt.trim()) return;

    setLoading(true);

    try {
      const data = await compareModels(prompt);
      setResult(data);
    } catch (err) {
      alert("Comparison Failed");
    }

    setLoading(false);
  }

  return (
    <div className="page-container">

      <h1>Multi-Model Comparison</h1>

      <textarea
        rows="10"
        placeholder="Enter your prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button onClick={handleCompare}>
        {loading ? "Comparing..." : "Compare Models"}
      </button>

      {result && (
        <>
          <h2 style={{ marginTop: "30px" }}>
            🏆 Best Model: {result.winner}
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            {result.models.map((model, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "20px",
                  background: "#fff",
                }}
              >
                <h2>{model.name}</h2>

                <p>
                  <strong>Quality:</strong> {model.quality}/10
                </p>

                <p>
                  <strong>Speed:</strong> {model.speed}
                </p>

                <hr />

                <pre
                  style={{
                    whiteSpace: "pre-wrap",
                    marginTop: "10px",
                  }}
                >
                  {model.response}
                </pre>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ModelComparison;