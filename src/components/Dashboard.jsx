import {
  FileText,
  CheckCircle2,
  ArrowUpRight,
  BarChart3,
  Sparkles,
} from "lucide-react";

function Dashboard({ setActivePage }) {
  const stats = [
    {
      title: "Total Prompts",
      value: "128",
      change: "+12.5%",
      icon: FileText,
    },
    {
      title: "Evaluations",
      value: "342",
      change: "+18.2%",
      icon: CheckCircle2,
    },
    {
      title: "Avg. Quality Score",
      value: "8.7/10",
      change: "+4.8%",
      icon: ArrowUpRight,
    },
    {
      title: "Models Tested",
      value: "06",
      change: "+2",
      icon: BarChart3,
    },
  ];

  return (
    <div className="dashboard-page">
      <div className="welcome-section">
        <div>
          <p className="eyebrow">GOOD EVENING, NAVYA 👋</p>

          <h1>Dashboard</h1>

          <p className="subtitle">
            Build, evaluate and optimize production-ready prompts.
          </p>
        </div>

        <button
          className="quick-action"
          onClick={() => setActivePage("Prompt Builder")}
        >
          <Sparkles size={16} />

          Create Prompt
        </button>
      </div>

      <div className="stats-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div className="stat-card" key={stat.title}>
              <div className="stat-top">
                <span className="stat-title">{stat.title}</span>

                <div className="stat-icon">
                  <Icon size={17} />
                </div>
              </div>

              <div className="stat-value">{stat.value}</div>

              <div className="stat-footer">
                <span className="positive">{stat.change}</span>

                <span>vs last month</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="dashboard-card">
        <div className="card-heading">
          <div>
            <h2>Prompt Engineering Activity</h2>

            <p>Monitor your prompt workflow performance.</p>
          </div>

          <span className="status-badge">LIVE</span>
        </div>

        <div className="activity-content">
          <div className="activity-number">1,248</div>

          <div>
            <strong>Prompt activities</strong>

            <p className="positive">+24.8% this month</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;