import {
  LayoutDashboard,
  Sparkles,
  Library,
  Play,
  Wand2,
  CheckCircle2,
  GitCompare,
  History,
  BarChart3,
  Settings,
  HelpCircle,
} from "lucide-react";

function Sidebar({ activePage, setActivePage }) {
  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Prompt Builder",
      icon: Sparkles,
    },
    {
      name: "Prompt Library",
      icon: Library,
    },
    {
      name: "Playground",
      icon: Play,
    },
    {
      name: "Prompt Optimizer",
      icon: Wand2,
    },
    {
      name: "Prompt Evaluator",
      icon: CheckCircle2,
    },
    {
      name: "Model Comparison",
      icon: GitCompare,
    },
    {
      name: "Version History",
      icon: History,
    },
    {
      name: "Analytics",
      icon: BarChart3,
    },
  ];

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-logo">P</div>

        <div>
          <h2>PromptForge</h2>
          <span>Engineering Toolkit</span>
        </div>
      </div>

      <div className="workspace">
        <span className="workspace-label">WORKSPACE</span>

        <div className="workspace-select">
          <div className="workspace-avatar">N</div>

          <span>My Workspace</span>
        </div>
      </div>

      <nav className="navigation">
        <span className="nav-label">MAIN MENU</span>

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.name}
              className={`nav-item ${
                activePage === item.name ? "active" : ""
              }`}
              onClick={() => setActivePage(item.name)}
            >
              <Icon size={18} />

              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <button
  className="bottom-item"
  onClick={() => setActivePage("Settings")}
>
  <Settings size={17} />
  Settings
</button>

        <div className="profile">
          <div className="profile-avatar">N</div>

          <div className="profile-info">
            <strong>Navya</strong>
            <span>Developer</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;