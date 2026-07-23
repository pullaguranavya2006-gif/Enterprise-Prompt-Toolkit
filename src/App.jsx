import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import PromptBuilder from "./components/PromptBuilder";
import PromptLibrary from "./components/PromptLibrary";
import Playground from "./components/Playground";
import PromptOptimizer from "./components/PromptOptimizer";
import PromptEvaluator from "./components/PromptEvaluator";
import ModelComparison from "./components/ModelComparison";
import VersionHistory from "./components/VersionHistory";
import Analytics from "./components/Analytics";
import SettingsPage from "./components/Settings";

import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "Dashboard":
        return (
          <Dashboard
            setActivePage={setActivePage}
          />
        );

      case "Prompt Builder":
        return (
          <PromptBuilder
            setActivePage={setActivePage}
          />
        );

      case "Prompt Library":
        return (
          <PromptLibrary />
        );

      case "Playground":
        return (
          <Playground />
        );

      case "Prompt Optimizer":
        return (
          <PromptOptimizer />
        );

      case "Prompt Evaluator":
        return (
          <PromptEvaluator />
        );

      case "Model Comparison":
        return (
          <ModelComparison />
        );

      case "Version History":
        return (
          <VersionHistory />
        );

      case "Analytics":
        return (
          <Analytics />
        );

      case "Settings":
        return (
          <SettingsPage />
        );

      default:
        return (
          <Dashboard
            setActivePage={setActivePage}
          />
        );
    }
  };

  return (
    <div className="app-container">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb">
            <span>Workspace</span>
            <span>/</span>
            <span>{activePage}</span>
          </div>

          <button
            className="new-prompt-btn"
            onClick={() =>
              setActivePage("Prompt Builder")
            }
          >
            + New Prompt
          </button>
        </header>

        <section className="content">
          {renderPage()}
        </section>
      </main>
    </div>
  );
}

export default App;