import { useEffect, useState } from "react";

function Settings() {
  const [settings, setSettings] = useState({
    theme: "Light",
    apiUrl: "http://127.0.0.1:8000",
    defaultModel: "GPT-4",
    autoSave: true,
  });

  useEffect(() => {
    const saved = localStorage.getItem("settings");
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  function handleChange(field, value) {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function saveSettings() {
    localStorage.setItem(
      "settings",
      JSON.stringify(settings)
    );

    alert("Settings Saved Successfully");
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>Settings</h1>

      <br />

      <label>Theme</label>

      <select
        value={settings.theme}
        onChange={(e) =>
          handleChange("theme", e.target.value)
        }
      >
        <option>Light</option>
        <option>Dark</option>
        <option>System</option>
      </select>

      <br />
      <br />

      <label>API URL</label>

      <input
        type="text"
        value={settings.apiUrl}
        onChange={(e) =>
          handleChange("apiUrl", e.target.value)
        }
        style={{ width: "400px" }}
      />

      <br />
      <br />

      <label>Default Model</label>

      <select
        value={settings.defaultModel}
        onChange={(e) =>
          handleChange("defaultModel", e.target.value)
        }
      >
        <option>GPT-4</option>
        <option>Claude</option>
        <option>Gemini</option>
        <option>Llama</option>
      </select>

      <br />
      <br />

      <label>
        <input
          type="checkbox"
          checked={settings.autoSave}
          onChange={(e) =>
            handleChange("autoSave", e.target.checked)
          }
        />

        Enable Auto Save
      </label>

      <br />
      <br />

      <button onClick={saveSettings}>
        Save Settings
      </button>
    </div>
  );
}

export default Settings;