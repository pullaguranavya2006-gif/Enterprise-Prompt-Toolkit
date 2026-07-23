import { useState } from "react";
import { evaluatePrompt } from "../services/api";

function PromptEvaluator() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleEvaluate() {
    if (!prompt.trim()) return;

    setLoading(true);

    try {
      const data = await evaluatePrompt(prompt);
      setResult(data);
    } catch (err) {
      alert("Evaluation Failed");
    }

    setLoading(false);
  }

  return (
    <div className="page-container">

      <h1>Prompt Evaluator</h1>

      <textarea
        rows="12"
        placeholder="Paste your prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button onClick={handleEvaluate}>
        {loading ? "Evaluating..." : "Evaluate Prompt"}
      </button>

      {result && (
        <div className="result-card">

          <h2>Quality Score</h2>

          <h1>{result.quality_score}/10</h1>

          <h3>Strengths</h3>

          <ul>
            {result.strengths.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h3>Weaknesses</h3>

          <ul>
            {result.weaknesses.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h3>Suggestions</h3>

          <ul>
            {result.suggestions.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

        </div>
      )}

    </div>
  );
}

export default PromptEvaluator;