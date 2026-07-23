import { useState } from "react";
import {
  Sparkles,
  Loader2,
  Wand2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

import { optimizePrompt } from "../services/api";

function PromptOptimizer() {
  const [prompt, setPrompt] = useState("");
  const [optimizedPrompt, setOptimizedPrompt] = useState("");
  const [quality, setQuality] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleOptimize() {
    if (!prompt.trim()) {
      setError("Please enter a prompt.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const result = await optimizePrompt(prompt);

      setOptimizedPrompt(result.optimized_prompt);
      setQuality(result.quality_score);
      setSuggestions(result.suggestions || []);
    } catch (err) {
      setError(err.response?.data?.detail || "Optimization failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <p className="eyebrow">PROMPT IMPROVEMENT</p>
          <h1>Prompt Optimizer</h1>
          <p>
            Improve existing prompts using Prompt Engineering best practices.
          </p>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "30px",
          marginTop: "30px",
        }}
      >
        {/* Left Side */}
        <div className="card">
          <h2>Original Prompt</h2>

          <textarea
            rows={15}
            placeholder="Paste your prompt here..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            style={{
              width: "100%",
              padding: "15px",
              borderRadius: "10px",
              border: "1px solid #d1d5db",
              resize: "vertical",
              marginTop: "15px",
            }}
          />

          {error && (
            <div
              style={{
                marginTop: "15px",
                color: "red",
                display: "flex",
                gap: "8px",
                alignItems: "center",
              }}
            >
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <button
            onClick={handleOptimize}
            disabled={loading}
            className="generate-button"
            style={{
              marginTop: "20px",
              width: "100%",
            }}
          >
            {loading ? (
              <>
                <Loader2 className="spin" size={18} />
                Optimizing...
              </>
            ) : (
              <>
                <Wand2 size={18} />
                Optimize Prompt
              </>
            )}
          </button>
        </div>

        {/* Right Side */}
        <div className="card">
          <h2>Optimized Prompt</h2>

          {optimizedPrompt ? (
            <>
              <textarea
                rows={15}
                value={optimizedPrompt}
                readOnly
                style={{
                  width: "100%",
                  padding: "15px",
                  borderRadius: "10px",
                  border: "1px solid #d1d5db",
                  background: "#f8fafc",
                  resize: "vertical",
                  marginTop: "15px",
                }}
              />

              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h3>
                  Quality Score:
                  <span
                    style={{
                      color: "#2563eb",
                      marginLeft: "8px",
                    }}
                  >
                    {quality}/10
                  </span>
                </h3>
              </div>

              <div style={{ marginTop: "20px" }}>
                <h3>Suggestions</h3>

                {suggestions.length === 0 ? (
                  <p>No suggestions.</p>
                ) : (
                  suggestions.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "flex-start",
                        marginTop: "12px",
                        padding: "10px",
                        background: "#eff6ff",
                        borderRadius: "8px",
                      }}
                    >
                      <CheckCircle
                        size={18}
                        color="green"
                      />

                      <span>{item}</span>
                    </div>
                  ))
                )}
              </div>
            </>
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "120px 20px",
                color: "#64748b",
              }}
            >
              <Sparkles size={50} />

              <h3 style={{ marginTop: "15px" }}>
                Optimized prompt will appear here
              </h3>

              <p>
                Enter a prompt and click <b>Optimize Prompt</b>.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PromptOptimizer;