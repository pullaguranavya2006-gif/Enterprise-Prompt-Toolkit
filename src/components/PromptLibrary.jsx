import { useEffect, useMemo, useState } from "react";
import {
  getPrompts,
  deletePrompt,
} from "../services/storage";

function PromptLibrary() {
  const [prompts, setPrompts] = useState([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState(null);
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    loadPrompts();
  }, []);

  function loadPrompts() {
    try {
      setError("");
      const data = getPrompts();
      setPrompts(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    }
  }

  function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Delete this prompt?"
    );

    if (!confirmDelete) return;

    deletePrompt(id);

    setPrompts((old) =>
      old.filter((item) => item.id !== id)
    );
  }

  async function handleCopy(text, id) {
    await navigator.clipboard.writeText(text);

    setCopied(id);

    setTimeout(() => {
      setCopied(null);
    }, 2000);
  }

  function exportPrompt(prompt) {
    const blob = new Blob([prompt.prompt], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = `${prompt.title}.txt`;

    link.click();

    URL.revokeObjectURL(url);
  }

  const filteredPrompts = useMemo(() => {
    let data = prompts.filter((prompt) =>
      `${prompt.title} ${prompt.category}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    if (sortBy === "quality") {
      data.sort(
        (a, b) => b.qualityScore - a.qualityScore
      );
    }

    if (sortBy === "title") {
      data.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }

    if (sortBy === "newest") {
      data.reverse();
    }

    return data;
  }, [prompts, search, sortBy]);

  return (
    <div
      style={{
        padding: "40px",
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <div>
          <p
            style={{
              color: "#4f46e5",
              fontWeight: "bold",
              letterSpacing: "2px",
            }}
          >
            PROMPT LIBRARY
          </p>

          <h1>Saved Prompts</h1>

          <p style={{ color: "#64748b" }}>
            Store, manage and reuse your prompts.
          </p>
        </div>

        <button onClick={loadPrompts}>
          Refresh
        </button>
      </div>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            flex: 1,
            padding: "12px",
          }}
        />

        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value)
          }
        >
          <option value="newest">
            Newest
          </option>

          <option value="quality">
            Highest Quality
          </option>

          <option value="title">
            Alphabetical
          </option>
        </select>
      </div>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "35px",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            flex: 1,
          }}
        >
          <h3>{prompts.length}</h3>

          <p>Total Prompts</p>
        </div>

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            flex: 1,
          }}
        >
          <h3>
            {prompts.length
              ? (
                  prompts.reduce(
                    (sum, item) =>
                      sum +
                      Number(item.qualityScore),
                    0
                  ) / prompts.length
                ).toFixed(1)
              : 0}
          </h3>

          <p>Average Quality</p>
        </div>

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            flex: 1,
          }}
        >
          <h3>
            {filteredPrompts.length}
          </h3>

          <p>Filtered Results</p>
        </div>
      </div>

      {error && (
        <div
          style={{
            color: "red",
            marginBottom: "20px",
          }}
        >
          {error}
        </div>
      )}

      {filteredPrompts.length === 0 ? (
        <div
          style={{
            background: "white",
            padding: "60px",
            textAlign: "center",
            borderRadius: "12px",
          }}
        >
          <h2>No Prompts Found</h2>

          <p>
            Create your first prompt from
            Prompt Builder.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill,minmax(340px,1fr))",
            gap: "20px",
          }}
        >
          {filteredPrompts.map((prompt) => (
            <div
              key={prompt.id}
              style={{
                background: "white",
                borderRadius: "14px",
                padding: "24px",
                boxShadow:
                  "0 5px 18px rgba(0,0,0,.06)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                }}
              >
                <h3>{prompt.title}</h3>

                <span
                  style={{
                    color:
                      prompt.qualityScore >= 8
                        ? "#16a34a"
                        : "#f59e0b",
                    fontWeight: "bold",
                  }}
                >
                  {prompt.qualityScore}/10
                </span>
              </div>

              <p
                style={{
                  color: "#64748b",
                  marginTop: "15px",
                  minHeight: "90px",
                }}
              >
                {prompt.prompt.substring(
                  0,
                  160
                )}
                ...
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "15px",
                }}
              >
                <span
                  style={{
                    background: "#eef2ff",
                    color: "#4338ca",
                    padding:
                      "5px 10px",
                    borderRadius: "20px",
                    fontSize: "12px",
                  }}
                >
                  {prompt.category}
                </span>

                <span
                  style={{
                    color: "#94a3b8",
                    fontSize: "13px",
                  }}
                >
                  {prompt.createdAt}
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "20px",
                  flexWrap: "wrap",
                }}
              >
                <button
                  onClick={() =>
                    handleCopy(
                      prompt.prompt,
                      prompt.id
                    )
                  }
                >
                  {copied === prompt.id
                    ? "Copied"
                    : "Copy"}
                </button>

                <button
                  onClick={() =>
                    setSelectedPrompt(
                      prompt
                    )
                  }
                >
                  View
                </button>

                <button
                  onClick={() =>
                    exportPrompt(prompt)
                  }
                >
                  Export
                </button>

                <button
                  style={{
                    color: "red",
                  }}
                  onClick={() =>
                    handleDelete(prompt.id)
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedPrompt && (
        <div
          onClick={() =>
            setSelectedPrompt(null)
          }
          style={{
            position: "fixed",
            inset: 0,
            background:
              "rgba(0,0,0,.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            onClick={(e) =>
              e.stopPropagation()
            }
            style={{
              width: "800px",
              maxHeight: "80vh",
              overflow: "auto",
              background: "white",
              borderRadius: "12px",
              padding: "30px",
            }}
          >
            <h2>
              {selectedPrompt.title}
            </h2>

            <pre
              style={{
                whiteSpace:
                  "pre-wrap",
                marginTop: "20px",
              }}
            >
              {selectedPrompt.prompt}
            </pre>

            <button
              style={{
                marginTop: "20px",
              }}
              onClick={() =>
                setSelectedPrompt(null)
              }
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PromptLibrary;