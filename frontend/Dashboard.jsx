import React, { useState } from 'react';
import ChartSection from './ChartSection';
import logo from './assets/logo.svg';

export default function Dashboard() {
  const [scores, setScores] = useState(null);
  const [repoUrl, setRepoUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchScores = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repo_url: repoUrl })
      });
      const data = await res.json();
      setScores(data);
    } catch (e) {
      alert("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <img src={logo} alt="logo" className="h-10 cursor-pointer" onClick={() => window.location.reload()} />
        <input
          type="text"
          placeholder="Enter GitHub repo URL"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          className="w-2/3 px-4 py-2 rounded bg-gray-800 border border-gray-600"
        />
        <button
          onClick={fetchScores}
          disabled={loading}
          className="ml-4 bg-primary px-4 py-2 rounded text-white hover:bg-purple-700"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </div>
      {scores && <ChartSection scores={scores} />}
    </div>
  );
}