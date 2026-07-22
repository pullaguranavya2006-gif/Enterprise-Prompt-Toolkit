import { useEffect, useState } from "react";
import {
  BarChart3,
  FileText,
  GitBranch,
  Sparkles,
  TrendingUp,
  Activity,
  Target,
  Lightbulb,
} from "lucide-react";

function Analytics() {
  const [analytics, setAnalytics] = useState({
    totalPrompts: 0,
    totalVersions: 0,
    averageQuality: 0,
    highestQuality: 0,
    promptActivity: 0,
  });

  useEffect(() => {
    const prompts =
      JSON.parse(
        localStorage.getItem("promptforge_prompts")
      ) || [];

    const versions =
      JSON.parse(
        localStorage.getItem("promptforge_versions")
      ) || [];

    const qualityScores = prompts.map((prompt) =>
      Number(prompt.qualityScore)
    );

    const averageQuality =
      qualityScores.length > 0
        ? qualityScores.reduce(
            (total, score) => total + score,
            0
          ) / qualityScores.length
        : 0;

    const highestQuality =
      qualityScores.length > 0
        ? Math.max(...qualityScores)
        : 0;

    setAnalytics({
      totalPrompts: prompts.length,
      totalVersions: versions.length,
      averageQuality: averageQuality.toFixed(1),
      highestQuality: highestQuality.toFixed(1),
      promptActivity: prompts.length + versions.length,
    });
  }, []);

  const getHealthScore = () => {
    let score = 0;

    if (analytics.totalPrompts > 0) {
      score += 25;
    }

    if (analytics.totalVersions > 0) {
      score += 25;
    }

    if (Number(analytics.averageQuality) >= 8) {
      score += 25;
    }

    if (analytics.promptActivity >= 3) {
      score += 25;
    }

    return score;
  };

  const healthScore = getHealthScore();

  return (
    <div className="analytics-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">
            WORKSPACE INTELLIGENCE
          </p>

          <h1>Analytics Dashboard</h1>

          <p className="subtitle">
            Monitor prompt quality, activity and engineering performance.
          </p>
        </div>

        <div className="analytics-status">
          <Activity size={16} />

          <span>Live Workspace Data</span>
        </div>
      </div>

      <div className="analytics-stats">
        <div className="analytics-stat-card">
          <div className="stat-icon">
            <FileText size={21} />
          </div>

          <div>
            <span>Total Prompts</span>

            <strong>{analytics.totalPrompts}</strong>

            <small>Created in workspace</small>
          </div>
        </div>

        <div className="analytics-stat-card">
          <div className="stat-icon">
            <GitBranch size={21} />
          </div>

          <div>
            <span>Prompt Versions</span>

            <strong>{analytics.totalVersions}</strong>

            <small>Tracked revisions</small>
          </div>
        </div>

        <div className="analytics-stat-card">
          <div className="stat-icon">
            <Sparkles size={21} />
          </div>

          <div>
            <span>Average Quality</span>

            <strong>
              {analytics.averageQuality}/10
            </strong>

            <small>Prompt quality score</small>
          </div>
        </div>

        <div className="analytics-stat-card">
          <div className="stat-icon">
            <TrendingUp size={21} />
          </div>

          <div>
            <span>Highest Quality</span>

            <strong>
              {analytics.highestQuality}/10
            </strong>

            <small>Best prompt score</small>
          </div>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="analytics-card health-card">
          <div className="analytics-card-header">
            <div>
              <h2>Workspace Health</h2>

              <p>
                Overall prompt engineering maturity.
              </p>
            </div>

            <Target size={21} />
          </div>

          <div className="health-content">
            <div
              className="health-circle"
              style={{
                "--health-score": `${healthScore * 3.6}deg`,
              }}
            >
              <div className="health-circle-inner">
                <strong>{healthScore}%</strong>

                <span>Health Score</span>
              </div>
            </div>

            <div className="health-details">
              <div>
                <span>Prompt Creation</span>

                <strong>
                  {analytics.totalPrompts > 0
                    ? "Active"
                    : "Pending"}
                </strong>
              </div>

              <div>
                <span>Version Control</span>

                <strong>
                  {analytics.totalVersions > 0
                    ? "Enabled"
                    : "Pending"}
                </strong>
              </div>

              <div>
                <span>Quality Monitoring</span>

                <strong>
                  {Number(
                    analytics.averageQuality
                  ) >= 8
                    ? "Excellent"
                    : "Improving"}
                </strong>
              </div>
            </div>
          </div>
        </div>

        <div className="analytics-card">
          <div className="analytics-card-header">
            <div>
              <h2>Prompt Engineering Framework</h2>

              <p>
                Recommended structure for high-quality prompts.
              </p>
            </div>

            <BarChart3 size={21} />
          </div>

          <div className="framework-bars">
            <div className="framework-row">
              <div>
                <span>Persona</span>

                <strong>92%</strong>
              </div>

              <div className="progress-bar">
                <span style={{ width: "92%" }}></span>
              </div>
            </div>

            <div className="framework-row">
              <div>
                <span>Context</span>

                <strong>86%</strong>
              </div>

              <div className="progress-bar">
                <span style={{ width: "86%" }}></span>
              </div>
            </div>

            <div className="framework-row">
              <div>
                <span>Task</span>

                <strong>96%</strong>
              </div>

              <div className="progress-bar">
                <span style={{ width: "96%" }}></span>
              </div>
            </div>

            <div className="framework-row">
              <div>
                <span>Constraints</span>

                <strong>78%</strong>
              </div>

              <div className="progress-bar">
                <span style={{ width: "78%" }}></span>
              </div>
            </div>

            <div className="framework-row">
              <div>
                <span>Output Format</span>

                <strong>89%</strong>
              </div>

              <div className="progress-bar">
                <span style={{ width: "89%" }}></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="analytics-card insights-card">
        <div className="analytics-card-header">
          <div>
            <h2>Engineering Insights</h2>

            <p>
              Automated analysis of your workspace activity.
            </p>
          </div>

          <Lightbulb size={21} />
        </div>

        <div className="insights-grid">
          <div className="insight-item">
            <div className="insight-icon">
              <TrendingUp size={18} />
            </div>

            <div>
              <strong>Prompt Quality Trend</strong>

              <p>
                Your workspace is using structured prompt engineering principles.
              </p>
            </div>
          </div>

          <div className="insight-item">
            <div className="insight-icon">
              <GitBranch size={18} />
            </div>

            <div>
              <strong>Version Control Active</strong>

              <p>
                Prompt changes are being tracked for reproducibility.
              </p>
            </div>
          </div>

          <div className="insight-item">
            <div className="insight-icon">
              <Sparkles size={18} />
            </div>

            <div>
              <strong>Optimization Ready</strong>

              <p>
                Use Prompt Optimizer to improve weak or vague prompts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;