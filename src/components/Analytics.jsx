import { useEffect, useState } from "react";
import { getAnalytics } from "../services/api";

function Analytics() {
  const [data, setData] = useState({
    totalPrompts: 0,
    averageScore: 0,
    categories: {},
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadAnalytics();
  }, []);

  async function loadAnalytics() {
    try {
      setLoading(true);

      const result = await getAnalytics();

      setData({
        totalPrompts: result?.totalPrompts ?? 0,
        averageScore: result?.averageScore ?? 0,
        categories: result?.categories ?? {},
      });
    } catch (err) {
      console.error(err);
      setError("Unable to load analytics.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div style={{ padding: "40px" }}>
        <h2>Loading Analytics...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "40px", color: "red" }}>
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>Analytics Dashboard</h1>

      <br />

      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px",
          border: "1px solid #ddd",
        }}
      >
        <h3>Total Prompts</h3>
        <h1>{data.totalPrompts}</h1>
      </div>

      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px",
          border: "1px solid #ddd",
        }}
      >
        <h3>Average Quality Score</h3>
        <h1>{data.averageScore}</h1>
      </div>

      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          border: "1px solid #ddd",
        }}
      >
        <h3>Categories</h3>

        {Object.keys(data.categories).length === 0 ? (
          <p>No category data available.</p>
        ) : (
          Object.entries(data.categories).map(([name, value]) => (
            <p key={name}>
              <strong>{name}</strong> : {value}
            </p>
          ))
        )}
      </div>
    </div>
  );
}

export default Analytics;