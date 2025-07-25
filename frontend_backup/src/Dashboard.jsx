// src/Dashboard.jsx
import React, { useState } from "react";
import ChartSection from "./ChartSection";

const Dashboard = () => {
  const [repoUrl, setRepoUrl] = useState("");
  const [scores, setScores] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!repoUrl.trim()) return;
    setLoading(true);
    setError("");
    setScores(null);

    try {
      const response = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repo_url: repoUrl }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "Unexpected error");
      setScores(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-mono px-6 py-10">
      {/* Title + Subtitle */}
      <header className="text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Research Code Health Dashboard</h1>
        <p className="text-gray-400 text-sm max-w-xl mx-auto">
          Enter any public GitHub repository URL to evaluate code quality, testing, modularity, and more.
        </p>
      </header>

      {/* Input Section */}
      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-4 items-center mb-10">
        <input
          type="text"
          placeholder="https://github.com/username/repository"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="px-6 py-2 bg-teal-500 hover:bg-teal-600 rounded text-white transition disabled:opacity-50"
        >
          {loading ? "Analyzing…" : "Run Analysis"}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-center text-red-400 mb-6 font-medium">
          ⚠️ {error}
        </div>
      )}

      {/* Charts and Suggestions */}
      {scores && (
        <>
          <ChartSection scores={scores} />

          {/* Suggestions */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md mt-10 max-w-3xl mx-auto">
            <h3 className="text-lg font-semibold mb-3">Recommendations</h3>
            <ul className="list-disc ml-6 text-sm text-gray-300 space-y-1">
              {scores.suggestions?.map((tip, idx) => (
                <li key={idx}>▪ {tip.replace(/^(\p{Emoji_Presentation}|\p{Extended_Pictographic})+/gu, '').trim()}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
