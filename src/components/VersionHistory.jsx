import { useState } from "react";
import {
  History,
  RotateCcw,
  Clock3,
  User,
  GitBranch,
  CheckCircle2,
  FileText,
  Eye,
} from "lucide-react";

function VersionHistory() {
  const initialVersions = [
    {
      id: 1,
      version: "v1.0",
      title: "AI Tutor Prompt",
      author: "Navya",
      date: "22 Jul 2026",
      time: "09:30 AM",
      status: "Initial Version",
      changes:
        "Created the first version using Persona, Context, Task, Constraints and Output Format.",
    },
    {
      id: 2,
      version: "v1.1",
      title: "AI Tutor Prompt",
      author: "Navya",
      date: "22 Jul 2026",
      time: "10:20 AM",
      status: "Improved",
      changes:
        "Added detailed constraints and improved expected output format.",
    },
    {
      id: 3,
      version: "v2.0",
      title: "AI Tutor Prompt",
      author: "Navya",
      date: "22 Jul 2026",
      time: "11:15 AM",
      status: "Production Ready",
      changes:
        "Optimized prompt with better instructions, examples and evaluation criteria.",
    },
  ];

  const [versions] = useState(initialVersions);
  const [selectedVersion, setSelectedVersion] = useState(initialVersions[2]);

  const resetHistory = () => {
    setSelectedVersion(initialVersions[2]);
  };

  return (
    <div className="history-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">PROMPT VERSION CONTROL</p>

          <h1>Version History</h1>

          <p className="subtitle">
            Track every update made to your prompts.
          </p>
        </div>

        <button
          className="secondary-button"
          onClick={resetHistory}
        >
          <RotateCcw size={16} />
          Latest Version
        </button>
      </div>

      <div className="evaluator-grid">
        <div className="evaluator-input-card">
          <div className="card-heading">
            <div>
              <h2>Available Versions</h2>

              <p>Select any version to view details.</p>
            </div>

            <History size={22} />
          </div>

          {versions.map((version) => (
            <div
              key={version.id}
              onClick={() => setSelectedVersion(version)}
              style={{
                marginBottom: "18px",
                padding: "18px",
                borderRadius: "12px",
                cursor: "pointer",
                border:
                  selectedVersion.id === version.id
                    ? "2px solid #6366f1"
                    : "1px solid #e2e8f0",
                background:
                  selectedVersion.id === version.id
                    ? "#eef2ff"
                    : "#ffffff",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <strong>{version.version}</strong>

                <span
                  style={{
                    color: "#6366f1",
                    fontWeight: "bold",
                  }}
                >
                  {version.status}
                </span>
              </div>

              <p
                style={{
                  marginTop: "10px",
                  color: "#64748b",
                }}
              >
                {version.title}
              </p>

              <small
                style={{
                  color: "#94a3b8",
                }}
              >
                {version.date}
              </small>
            </div>
          ))}
        </div>

        <div className="evaluation-result-card">
          <div className="card-heading">
            <div>
              <h2>Version Details</h2>

              <p>Detailed information about the selected version.</p>
            </div>

            <Eye size={22} />
          </div>

          <div
            style={{
              display: "grid",
              gap: "20px",
            }}
          >
            <div
              style={{
                padding: "20px",
                borderRadius: "12px",
                background: "#f8fafc",
              }}
            >
              <h2>{selectedVersion.title}</h2>

              <h3
                style={{
                  color: "#6366f1",
                }}
              >
                {selectedVersion.version}
              </h3>
            </div>

            <div className="criteria-item">
              <div className="criteria-info">
                <User size={18} />

                <span>Author</span>
              </div>

              <strong>{selectedVersion.author}</strong>
            </div>

            <div className="criteria-item">
              <div className="criteria-info">
                <Clock3 size={18} />

                <span>Date & Time</span>
              </div>

              <strong>
                {selectedVersion.date} | {selectedVersion.time}
              </strong>
            </div>

            <div className="criteria-item">
              <div className="criteria-info">
                <GitBranch size={18} />

                <span>Status</span>
              </div>

              <strong>{selectedVersion.status}</strong>
            </div>

            <div className="criteria-item">
              <div className="criteria-info">
                <FileText size={18} />

                <span>Changes</span>
              </div>
            </div>

            <div
              style={{
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "10px",
                padding: "18px",
                lineHeight: "1.8",
                color: "#475569",
              }}
            >
              {selectedVersion.changes}
            </div>

            <div
              style={{
                background: "#dcfce7",
                color: "#166534",
                padding: "16px",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <CheckCircle2 size={20} />

              This version has been successfully saved in the
              project history.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VersionHistory;