import { useState } from "react";
import {
  GitCompare,
  Sparkles,
  CheckCircle2,
  Clock3,
  BarChart3,
  RotateCcw,
  Trophy,
} from "lucide-react";

function ModelComparison() {
  const [prompt, setPrompt] = useState("");

  const [selectedModels, setSelectedModels] = useState([
    "GPT-4o",
    "Claude 3.5 Sonnet",
    "Gemini 1.5 Pro",
  ]);

  const [comparison, setComparison] = useState(null);

  const models = [
    {
      name: "GPT-4o",
      provider: "OpenAI",
      response:
        "Artificial Intelligence (AI) is a branch of computer science that enables machines to perform tasks that normally require human intelligence. It includes learning, reasoning, language understanding and problem solving.",
      speed: "1.2s",
      quality: 9.4,
      tokens: 52,
    },
    {
      name: "Claude 3.5 Sonnet",
      provider: "Anthropic",
      response:
        "Artificial Intelligence refers to computer systems capable of performing tasks associated with human intelligence. These systems learn from data, identify patterns and produce meaningful outputs.",
      speed: "1.6s",
      quality: 9.2,
      tokens: 48,
    },
    {
      name: "Gemini 1.5 Pro",
      provider: "Google",
      response:
        "AI allows computers and machines to simulate human intelligence using algorithms and large amounts of data to solve problems and generate responses.",
      speed: "1.4s",
      quality: 8.9,
      tokens: 45,
    },
    {
      name: "Llama 3.1",
      provider: "Meta",
      response:
        "Artificial Intelligence is the science of creating systems that can learn, reason and make intelligent decisions similar to humans.",
      speed: "1.1s",
      quality: 8.5,
      tokens: 34,
    },
  ];

  const toggleModel = (modelName) => {
    if (selectedModels.includes(modelName)) {
      setSelectedModels(
        selectedModels.filter((model) => model !== modelName)
      );
      return;
    }

    if (selectedModels.length < 3) {
      setSelectedModels([...selectedModels, modelName]);
    }
  };

  const compareModels = () => {
    if (!prompt.trim()) {
      alert("Please enter a prompt.");
      return;
    }

    const selectedResults = models.filter((model) =>
      selectedModels.includes(model.name)
    );

    const bestModel = selectedResults.reduce((best, current) =>
      current.quality > best.quality ? current : best
    );

    setComparison({
      results: selectedResults,
      bestModel,
    });
  };

  const resetComparison = () => {
    setPrompt("");
    setComparison(null);
    setSelectedModels([
      "GPT-4o",
      "Claude 3.5 Sonnet",
      "Gemini 1.5 Pro",
    ]);
  };

  return (
    <div className="comparison-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">MULTI-MODEL INTELLIGENCE</p>

          <h1>Model Comparison</h1>

          <p className="subtitle">
            Compare AI model responses using a single prompt.
          </p>
        </div>

        <button
          className="secondary-button"
          onClick={resetComparison}
        >
          <RotateCcw size={15} />
          Reset
        </button>
      </div>

      <div className="comparison-input-card">
        <div className="card-heading">
          <div>
            <h2>Comparison Prompt</h2>

            <p>
              Enter one prompt to evaluate across multiple
              models.
            </p>
          </div>

          <GitCompare size={21} />
        </div>

        <textarea
          className="comparison-textarea"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Example: Explain Artificial Intelligence to a beginner..."
        />

        <div className="model-selection">
          <div className="selection-heading">
            <span>Select Models</span>

            <small>Select up to 3 models</small>
          </div>

          <div className="model-options">
            {models.map((model) => (
              <button
                key={model.name}
                className={`model-option ${
                  selectedModels.includes(model.name)
                    ? "model-selected"
                    : ""
                }`}
                onClick={() => toggleModel(model.name)}
              >
                <div>
                  <strong>{model.name}</strong>

                  <small>{model.provider}</small>
                </div>

                {selectedModels.includes(model.name) && (
                  <CheckCircle2 size={18} />
                )}
              </button>
            ))}
          </div>
        </div>

        <button
          className="generate-button"
          onClick={compareModels}
          disabled={
            !prompt.trim() || selectedModels.length === 0
          }
        >
          <GitCompare size={18} />
          Compare Models
        </button>
      </div>

      {!comparison ? (
        <div className="empty-comparison">
          <GitCompare size={42} />

          <h3>Comparison results will appear here</h3>

          <p>
            Enter a prompt and compare multiple AI
            models.
          </p>
        </div>
      ) : (
        <>
          <div className="comparison-summary">
            <div className="winner-card">
              <div className="winner-icon">
                <Trophy size={24} />
              </div>

              <div>
                <span>BEST PERFORMING MODEL</span>

                <h2>{comparison.bestModel.name}</h2>

                <p>
                  Quality Score{" "}
                  <strong>
                    {comparison.bestModel.quality}/10
                  </strong>
                </p>
              </div>
            </div>

            <div className="summary-stat">
              <BarChart3 size={20} />

              <div>
                <span>Models Compared</span>

                <strong>
                  {comparison.results.length}
                </strong>
              </div>
            </div>

            <div className="summary-stat">
              <Sparkles size={20} />

              <div>
                <span>Prompt Type</span>

                <strong>Single Prompt</strong>
              </div>
            </div>
          </div>

          <div className="model-results">
            {comparison.results.map((model) => (
              <div
                key={model.name}
                className={`model-result-card ${
                  model.name === comparison.bestModel.name
                    ? "best-model"
                    : ""
                }`}
              >
                {model.name ===
                  comparison.bestModel.name && (
                  <div className="best-badge">
                    <Trophy size={13} />
                    Best Result
                  </div>
                )}

                <div className="model-result-header">
                  <div>
                    <span className="model-provider">
                      {model.provider}
                    </span>

                    <h2>{model.name}</h2>
                  </div>

                  <div className="quality-badge">
                    {model.quality}/10
                  </div>
                </div>

                <div className="response-box">
                  <p>{model.response}</p>
                </div>

                <div className="model-metrics">
                  <div>
                    <Clock3 size={15} />
                    <span>Response Time</span>
                    <strong>{model.speed}</strong>
                  </div>

                  <div>
                    <BarChart3 size={15} />
                    <span>Tokens</span>
                    <strong>{model.tokens}</strong>
                  </div>

                  <div>
                    <Sparkles size={15} />
                    <span>Quality</span>
                    <strong>{model.quality}/10</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ModelComparison;