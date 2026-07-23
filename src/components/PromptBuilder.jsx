import { useState } from "react";
import toast from "react-hot-toast";

import {
  Sparkles,
  ArrowLeft,
  RotateCcw,
  Loader2,
  Save,
  Check,
} from "lucide-react";

import { createPrompt } from "../services/api";

function PromptBuilder({ setActivePage }) {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    persona: "",
    context: "",
    task: "",
    constraints: "",
    output_format: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function handleChange(field, value) {
    setFormData({
      ...formData,
      [field]: value,
    });
  }

  function resetForm() {
    setFormData({
      title: "",
      category: "",
      persona: "",
      context: "",
      task: "",
      constraints: "",
      output_format: "",
    });

    setResult(null);
  }

  async function generatePrompt() {
    setLoading(true);

    try {
      const generated = {
        structured_prompt: `${formData.persona}

Context:
${formData.context}

Task:
${formData.task}

Constraints:
${formData.constraints}

Output:
${formData.output_format}`,

        quality_score: 9,
        framework: "5 Pillar Framework",
      };

      setResult(generated);

      toast.success("Prompt Generated Successfully");
    } catch (err) {
      toast.error("Unable to Generate Prompt");
    } finally {
      setLoading(false);
    }
  }

  async function savePrompt() {
    if (!result) {
      toast.error("Generate Prompt First");
      return;
    }

    try {
      setSaving(true);

      const data = {
        title: formData.title || "Untitled Prompt",
        category: formData.category || "General",
        prompt: result.structured_prompt,
        qualityScore: result.quality_score,
        createdAt: new Date().toLocaleDateString(),
      };

      await createPrompt(data);

      toast.success("Prompt Saved Successfully");

      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 2000);
    } catch (err) {
      toast.error("Failed To Save Prompt");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="prompt-builder-page">
      <div className="page-header">
        <div>
          <p className="eyebrow">PROMPT ENGINEERING WORKFLOW</p>

          <h1>Prompt Builder</h1>

          <p>Create and save production-ready prompts.</p>
        </div>

        <button
          className="secondary-button"
          onClick={() => setActivePage("Dashboard")}
        >
          <ArrowLeft size={16} />
          Back
        </button>
      </div>

      <div className="builder-layout">
        <section className="builder-card">
          <div className="card-header">
            <h2>Build Prompt</h2>

            <button
              className="clear-button"
              onClick={resetForm}
            >
              <RotateCcw size={15} />
              Clear
            </button>
          </div>

          <input
            placeholder="Prompt Title"
            value={formData.title}
            onChange={(e) =>
              handleChange("title", e.target.value)
            }
          />

          <input
            placeholder="Category"
            value={formData.category}
            onChange={(e) =>
              handleChange("category", e.target.value)
            }
          />

          <textarea
            placeholder="Persona"
            rows="3"
            value={formData.persona}
            onChange={(e) =>
              handleChange("persona", e.target.value)
            }
          />

          <textarea
            placeholder="Context"
            rows="3"
            value={formData.context}
            onChange={(e) =>
              handleChange("context", e.target.value)
            }
          />

          <textarea
            placeholder="Task"
            rows="3"
            value={formData.task}
            onChange={(e) =>
              handleChange("task", e.target.value)
            }
          />

          <textarea
            placeholder="Constraints"
            rows="3"
            value={formData.constraints}
            onChange={(e) =>
              handleChange("constraints", e.target.value)
            }
          />

          <textarea
            placeholder="Output Format"
            rows="3"
            value={formData.output_format}
            onChange={(e) =>
              handleChange("output_format", e.target.value)
            }
          />

          <button
            className="generate-button"
            onClick={generatePrompt}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles />
                Generate Prompt
              </>
            )}
          </button>
        </section>

        <section className="preview-card">
          <h2>Preview</h2>

          {result ? (
            <>
              <pre>{result.structured_prompt}</pre>

              <button
                className="generate-button"
                onClick={savePrompt}
                disabled={saving}
              >
                {saved ? (
                  <>
                    <Check />
                    Saved
                  </>
                ) : (
                  <>
                    <Save />
                    Save Prompt
                  </>
                )}
              </button>
            </>
          ) : (
            <div>
              <Sparkles size={40} />

              <h3>Your prompt appears here</h3>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default PromptBuilder;