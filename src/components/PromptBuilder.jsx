import { savePrompt } from "../services/storage";
const handleSavePrompt = () => {
  savePrompt({
    title,

    prompt: generatedPrompt,

    category,

    qualityScore: "9.2",
  });

  alert("Prompt Saved Successfully!");
};
import { useState } from "react";

import {
  Sparkles,
  Copy,
  Check,
  ArrowLeft,
  RotateCcw,
  Loader2,
  AlertCircle,
} from "lucide-react";

import { generatePrompt } from "../services/api";


function PromptBuilder({ setActivePage }) {
  const [formData, setFormData] = useState({
    persona: "",
    context: "",
    task: "",
    constraints: "",
    output_format: "",
  });

  const [result, setResult] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  const [copied, setCopied] = useState(false);


  const handleChange = (field, value) => {
    setFormData((previous) => ({
      ...previous,

      [field]: value,
    }));
  };


  const handleReset = () => {
    setFormData({
      persona: "",
      context: "",
      task: "",
      constraints: "",
      output_format: "",
    });

    setResult(null);

    setError("");

    setCopied(false);
  };


  const handleGenerate = async () => {
    setError("");

    setResult(null);

    const emptyField = Object.values(formData).some(
      (value) => value.trim() === ""
    );

    if (emptyField) {
      setError(
        "Please complete all five prompt engineering pillars."
      );

      return;
    }

    try {
      setIsLoading(true);

      const response = await generatePrompt(formData);

      setResult(response);
    } catch (apiError) {
      setError(
        apiError.message ||
          "Unable to connect to the PromptForge API."
      );
    } finally {
      setIsLoading(false);
    }
  };


  const handleCopy = async () => {
    if (!result?.structured_prompt) {
      return;
    }

    await navigator.clipboard.writeText(
      result.structured_prompt
    );

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };


  const pillars = [
    {
      number: "01",

      key: "persona",

      title: "Persona / Role",

      description: "Who should the AI act as?",

      placeholder:
        "Example: an expert customer support specialist",
    },

    {
      number: "02",

      key: "context",

      title: "Context",

      description:
        "What background information does the AI need?",

      placeholder:
        "Example: The company provides SaaS products to customers...",
    },

    {
      number: "03",

      key: "task",

      title: "Task",

      description: "What should the AI do?",

      placeholder:
        "Example: Answer customer questions and solve their problems...",
    },

    {
      number: "04",

      key: "constraints",

      title: "Constraints",

      description:
        "What rules and limitations should be followed?",

      placeholder:
        "Example: Be polite, concise and never invent information...",
    },

    {
      number: "05",

      key: "output_format",

      title: "Expected Output",

      description:
        "What format should the response follow?",

      placeholder:
        "Example: Return a clear and professional response...",
    },
  ];


  return (
    <div className="prompt-builder-page">

      <div className="page-header">

        <div>

          <div className="eyebrow">
            PROMPT ENGINEERING WORKFLOW
          </div>

          <h1>Prompt Builder</h1>

          <p>
            Design structured prompts using the five-pillar
            framework.
          </p>

        </div>


        <button
          className="secondary-button"
          onClick={() => setActivePage("Dashboard")}
        >
          <ArrowLeft size={16} />

          Back to Dashboard
        </button>

      </div>


      {error && (
        <div className="error-message">

          <AlertCircle size={18} />

          <span>{error}</span>

        </div>
      )}


      <div className="builder-layout">

        <section className="builder-card">

          <div className="card-header">

            <div>

              <h2>Build Your Prompt</h2>

              <p>
                Complete each section to create a
                production-ready prompt.
              </p>

            </div>


            <button
              className="clear-button"
              onClick={handleReset}
            >
              <RotateCcw size={15} />

              Clear
            </button>

          </div>


          <div className="prompt-name-field">

            <label>Prompt Name</label>

            <input
              type="text"
              placeholder="Example: AI Tutor"
            />

          </div>


          <div className="pillar-list">

            {pillars.map((pillar) => (
              <div
                className="pillar-card"
                key={pillar.key}
              >

                <div className="pillar-number">
                  {pillar.number}
                </div>


                <div className="pillar-content">

                  <h3>{pillar.title}</h3>

                  <p>{pillar.description}</p>


                  <textarea
                    value={formData[pillar.key]}
                    onChange={(event) =>
                      handleChange(
                        pillar.key,
                        event.target.value
                      )
                    }
                    placeholder={pillar.placeholder}
                    rows={4}
                  />

                </div>

              </div>
            ))}

          </div>


          <button
            className="generate-button"
            onClick={handleGenerate}
            disabled={isLoading}
          >

            {isLoading ? (
              <>
                <Loader2
                  size={18}
                  className="spin"
                />

                Generating...
              </>
            ) : (
              <>
                <Sparkles size={18} />

                Generate Structured Prompt
              </>
            )}

          </button>

        </section>


        <section className="preview-card">

          <div className="preview-header">

            <div>

              <h2>Prompt Preview</h2>

              <p>
                Generated production-ready prompt
              </p>

            </div>


            {result && (
              <button
                className="copy-button"
                onClick={handleCopy}
              >

                {copied ? (
                  <>
                    <Check size={16} />

                    Copied
                  </>
                ) : (
                  <>
                    <Copy size={16} />

                    Copy
                  </>
                )}

              </button>
            )}

          </div>


          {result ? (
            <>

              <div className="score-panel">

                <div>

                  <span>Quality Score</span>

                  <strong>
                    {result.quality_score}/10
                  </strong>

                </div>


                <div>

                  <span>Framework</span>

                  <strong>
                    {result.framework}
                  </strong>

                </div>

              </div>


              <div className="generated-prompt">

                <pre>
                  {result.structured_prompt}
                </pre>

              </div>


              <div className="suggestions-panel">

                <h3>Optimization Suggestions</h3>

                {result.suggestions.map(
                  (suggestion, index) => (
                    <div
                      className="suggestion"
                      key={index}
                    >
                      <Sparkles size={15} />

                      <span>{suggestion}</span>
                    </div>
                  )
                )}

              </div>


              <div className="pillar-scores">

                <h3>Pillar Scores</h3>


                {Object.entries(
                  result.pillar_scores
                ).map(([pillar, score]) => (
                  <div
                    className="pillar-score"
                    key={pillar}
                  >

                    <span>
                      {pillar.replace(
                        "_",
                        " "
                      )}
                    </span>

                    <strong>{score}/10</strong>

                  </div>
                ))}

              </div>

            </>
          ) : (
            <div className="empty-preview">

              <Sparkles size={36} />

              <h3>Your prompt will appear here</h3>

              <p>
                Complete the prompt framework and
                generate your first structured prompt.
              </p>

            </div>
          )}

        </section>

      </div>

    </div>
  );
}


export default PromptBuilder;