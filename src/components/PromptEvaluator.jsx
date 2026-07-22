import { useState } from "react";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Activity,
  Sparkles,
  RotateCcw,
} from "lucide-react";

function PromptEvaluator() {
  const [prompt, setPrompt] = useState("");

  const [evaluation, setEvaluation] = useState(null);

  const evaluatePrompt = () => {
    if (!prompt.trim()) {
      setEvaluation({
        error: "Please enter a prompt before evaluation.",
      });

      return;
    }

    const text = prompt.toLowerCase();

    const checks = [
      {
        name: "Persona / Role Clarity",
        keywords: ["you are", "act as", "role", "expert"],
        weight: 20,
      },
      {
        name: "Context Completeness",
        keywords: ["context", "background", "company", "user", "scenario"],
        weight: 20,
      },
      {
        name: "Task Clarity",
        keywords: ["task", "create", "analyze", "generate", "explain", "write"],
        weight: 20,
      },
      {
        name: "Constraint Quality",
        keywords: [
          "must",
          "should",
          "do not",
          "don't",
          "avoid",
          "limit",
        ],
        weight: 20,
      },
      {
        name: "Output Format",
        keywords: [
          "format",
          "json",
          "table",
          "list",
          "steps",
          "structure",
        ],
        weight: 20,
      },
    ];

    const results = checks.map((check) => {
      const matchedKeywords = check.keywords.filter((keyword) =>
        text.includes(keyword)
      );

      const percentage =
        matchedKeywords.length > 0 ? 100 : 0;

      return {
        ...check,
        percentage,
        status:
          percentage === 100
            ? "excellent"
            : "missing",
      };
    });

    const pillarScore = results.reduce(
      (total, item) => total + item.percentage,
      0
    );

    const lengthScore =
      prompt.length >= 100
        ? 10
        : prompt.length >= 50
        ? 7
        : 4;

    const finalScore = Math.min(
      10,
      (pillarScore / 100) * 8 + lengthScore / 5
    ).toFixed(1);

    const strengths = results
      .filter((item) => item.status === "excellent")
      .map((item) => item.name);

    const improvements = results
      .filter((item) => item.status === "missing")
      .map((item) => item.name);

    setEvaluation({
      score: finalScore,
      results,
      strengths,
      improvements,
      length: prompt.length,
    });
  };

  const resetEvaluator = () => {
    setPrompt("");

    setEvaluation(null);
  };

  const getScoreLabel = (score) => {
    if (score >= 8.5) {
      return "Excellent";
    }

    if (score >= 7) {
      return "Good";
    }

    if (score >= 5) {
      return "Needs Improvement";
    }

    return "Poor";
  };

  return (
    <div className="evaluator-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">PROMPT QUALITY INTELLIGENCE</p>

          <h1>Prompt Evaluator</h1>

          <p className="subtitle">
            Analyze prompt quality using structured engineering criteria.
          </p>
        </div>

        <button
          className="secondary-button"
          onClick={resetEvaluator}
        >
          <RotateCcw size={15} />

          Reset
        </button>
      </div>

      <div className="evaluator-grid">
        <div className="evaluator-input-card">
          <div className="card-heading">
            <div>
              <h2>Evaluate Prompt</h2>

              <p>
                Paste your prompt to receive an engineering quality analysis.
              </p>
            </div>

            <Sparkles size={21} />
          </div>

          <textarea
            className="evaluator-textarea"
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            placeholder="Paste your prompt here..."
          />

          <div className="character-count">
            {prompt.length} characters
          </div>

          <button
            className="generate-button"
            onClick={evaluatePrompt}
          >
            <Activity size={18} />

            Evaluate Prompt
          </button>

          {evaluation?.error && (
            <div className="error-message">
              <AlertTriangle size={17} />

              {evaluation.error}
            </div>
          )}
        </div>

        <div className="evaluation-result-card">
          {!evaluation || evaluation.error ? (
            <div className="empty-preview">
              <Activity size={42} />

              <h3>Evaluation results will appear here</h3>

              <p>
                Submit a prompt to analyze its engineering quality.
              </p>
            </div>
          ) : (
            <>
              <div className="score-section">
                <div className="score-circle">
                  <strong>{evaluation.score}</strong>

                  <span>/10</span>
                </div>

                <div>
                  <p className="eyebrow">OVERALL QUALITY</p>

                  <h2>
                    {getScoreLabel(evaluation.score)}
                  </h2>

                  <p className="subtitle">
                    Based on five prompt engineering pillars.
                  </p>
                </div>
              </div>

              <div className="evaluation-stats">
                <div>
                  <span>Prompt Length</span>

                  <strong>
                    {evaluation.length} chars
                  </strong>
                </div>

                <div>
                  <span>Strengths</span>

                  <strong className="positive">
                    {evaluation.strengths.length}
                  </strong>
                </div>

                <div>
                  <span>Improvements</span>

                  <strong className="warning-text">
                    {evaluation.improvements.length}
                  </strong>
                </div>
              </div>

              <div className="criteria-section">
                <h3>Quality Analysis</h3>

                {evaluation.results.map((item) => (
                  <div
                    className="criteria-item"
                    key={item.name}
                  >
                    <div className="criteria-info">
                      {item.status === "excellent" ? (
                        <CheckCircle2
                          size={18}
                          className="success-icon"
                        />
                      ) : (
                        <XCircle
                          size={18}
                          className="danger-icon"
                        />
                      )}

                      <span>{item.name}</span>
                    </div>

                    <span
                      className={
                        item.status === "excellent"
                          ? "criteria-status success-text"
                          : "criteria-status danger-text"
                      }
                    >
                      {item.status === "excellent"
                        ? "Detected"
                        : "Missing"}
                    </span>
                  </div>
                ))}
              </div>

              {evaluation.improvements.length > 0 && (
                <div className="improvement-box">
                  <AlertTriangle size={18} />

                  <div>
                    <strong>Recommended Improvements</strong>

                    <p>
                      Add clarity for:{" "}
                      {evaluation.improvements.join(", ")}.
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default PromptEvaluator;