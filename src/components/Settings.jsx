import { useState, useEffect } from "react";
import {
  Settings,
  User,
  Moon,
  Sun,
  Bell,
  Save,
  RotateCcw,
} from "lucide-react";

function SettingsPage() {
  const [settings, setSettings] = useState({
    username: "Navya",
    email: "navya@example.com",
    darkMode: false,
    notifications: true,
  });

  useEffect(() => {
    const saved = localStorage.getItem("promptforge_settings");

    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  const handleChange = (field, value) => {
    setSettings((old) => ({
      ...old,
      [field]: value,
    }));
  };

  const saveSettings = () => {
    localStorage.setItem(
      "promptforge_settings",
      JSON.stringify(settings)
    );

    alert("Settings saved successfully.");
  };

  const resetSettings = () => {
    const defaults = {
      username: "Navya",
      email: "navya@example.com",
      darkMode: false,
      notifications: true,
    };

    setSettings(defaults);

    localStorage.setItem(
      "promptforge_settings",
      JSON.stringify(defaults)
    );
  };

  return (
    <div className="evaluator-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">
            APPLICATION SETTINGS
          </p>

          <h1>Settings</h1>

          <p className="subtitle">
            Customize your Prompt Engineering Toolkit.
          </p>
        </div>

        <button
          className="secondary-button"
          onClick={resetSettings}
        >
          <RotateCcw size={16} />
          Reset
        </button>
      </div>

      <div className="evaluator-grid">
        <div className="evaluator-input-card">
          <div className="card-heading">
            <div>
              <h2>Profile</h2>

              <p>
                Update your workspace information.
              </p>
            </div>

            <User size={22} />
          </div>

          <label>Name</label>

          <input
            className="evaluator-textarea"
            style={{ height: "45px" }}
            value={settings.username}
            onChange={(e) =>
              handleChange(
                "username",
                e.target.value
              )
            }
          />

          <label style={{ marginTop: "20px" }}>
            Email
          </label>

          <input
            className="evaluator-textarea"
            style={{ height: "45px" }}
            value={settings.email}
            onChange={(e) =>
              handleChange(
                "email",
                e.target.value
              )
            }
          />

          <button
            className="generate-button"
            onClick={saveSettings}
          >
            <Save size={18} />
            Save Settings
          </button>
        </div>

        <div className="evaluation-result-card">
          <div className="card-heading">
            <div>
              <h2>Preferences</h2>

              <p>
                Configure your application.
              </p>
            </div>

            <Settings size={22} />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems: "center",
              marginTop: "25px",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
              }}
            >
              {settings.darkMode ? (
                <Moon />
              ) : (
                <Sun />
              )}

              <span>Dark Mode</span>
            </div>

            <input
              type="checkbox"
              checked={settings.darkMode}
              onChange={(e) =>
                handleChange(
                  "darkMode",
                  e.target.checked
                )
              }
            />
          </div>

          <hr
            style={{
              margin: "20px 0",
            }}
          />

          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <Bell />

              <span>
                Notifications
              </span>
            </div>

            <input
              type="checkbox"
              checked={
                settings.notifications
              }
              onChange={(e) =>
                handleChange(
                  "notifications",
                  e.target.checked
                )
              }
            />
          </div>

          <div
            style={{
              marginTop: "40px",
              background: "#eef2ff",
              padding: "20px",
              borderRadius: "12px",
            }}
          >
            <h3>Workspace Summary</h3>

            <p>
              <strong>User:</strong>{" "}
              {settings.username}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {settings.email}
            </p>

            <p>
              <strong>Theme:</strong>{" "}
              {settings.darkMode
                ? "Dark"
                : "Light"}
            </p>

            <p>
              <strong>Notifications:</strong>{" "}
              {settings.notifications
                ? "Enabled"
                : "Disabled"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;