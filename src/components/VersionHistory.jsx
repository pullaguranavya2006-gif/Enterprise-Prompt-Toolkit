import { useEffect, useState } from "react";
import { getVersions } from "../services/api";

function VersionHistory() {
  const [versions, setVersions] = useState([]);

  useEffect(() => {
    loadVersions();
  }, []);

  async function loadVersions() {
    const data = await getVersions();
    setVersions(data);
  }

  return (
    <div className="page">
      <h1>Version History</h1>

      <p>
        All prompt revisions stored in the database.
      </p>

      <div className="table-container">
        <table className="version-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Prompt ID</th>
              <th>Version</th>
              <th>Created</th>
            </tr>
          </thead>

          <tbody>
            {versions.map((version) => (
              <tr key={version.id}>
                <td>{version.id}</td>
                <td>{version.prompt_id}</td>
                <td>{version.version_number}</td>
                <td>{version.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {versions.length === 0 && (
          <p>No versions available.</p>
        )}
      </div>
    </div>
  );
}

export default VersionHistory;