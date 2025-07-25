import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, BarChart, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer } from 'recharts';
import html2canvas from 'html2canvas';

export default function ChartSection({ scores }) {
  const radarData = [
    { metric: "README", score: scores.readme_score },
    { metric: "Tests", score: scores.test_score },
    { metric: "Quality", score: scores.code_quality_score },
    { metric: "Maintenance", score: scores.maintenance_score },
    { metric: "Deps", score: scores.dependency_score },
    { metric: "Modularity", score: scores.modularity_score },
    { metric: "Comments", score: scores.comments_style_score },
  ];

  const barData = radarData.map(d => ({ name: d.metric, Score: d.score }));

  const downloadPNG = async () => {
    const node = document.getElementById('chart-section');
    const canvas = await html2canvas(node);
    const link = document.createElement('a');
    link.download = 'dashboard.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div id="chart-section">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-800 p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Code Health Radar</h2>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" />
              <Radar dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-gray-800 p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Score Breakdown</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Score" fill="#2CB67D" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-gray-800 p-4 rounded shadow mb-4">
        <h2 className="text-lg font-semibold mb-2">Suggestions</h2>
        <ul className="list-disc ml-6">
          {scores.suggestions.map((s, idx) => (
            <li key={idx}>{s}</li>
          ))}
        </ul>
      </div>
      <button
        onClick={downloadPNG}
        className="bg-secondary text-black px-4 py-2 rounded hover:bg-green-500"
      >
        Download as PNG
      </button>
    </div>
  );
}