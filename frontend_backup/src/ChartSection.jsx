// src/ChartSection.jsx
import React from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';
import html2canvas from 'html2canvas';

const chartColors = {
  radar: "#82ca9d",
  bar: "#8884d8"
};

const ChartSection = ({ scores }) => {
  if (!scores) return null;

  const data = Object.keys(scores)
    .filter(key => key.endsWith('_score'))
    .map(key => ({
      metric: key
        .replace("_score", "")
        .replace(/_/g, " ")
        .replace(/\b\w/g, c => c.toUpperCase()), // Capitalize
      value: scores[key],
    }));

  const downloadChart = (id) => {
    const el = document.getElementById(id);
    html2canvas(el).then(canvas => {
      const link = document.createElement("a");
      link.download = `${id}.png`;
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <div className="text-white space-y-10 mt-10">
      {/* Radar Chart Section */}
      <div id="radarChart" className="bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-2 font-mono">📡 Radar View of Code Health</h2>
        <p className="text-sm text-gray-400 mb-4">
          Each axis represents one code health metric. Higher values are better.
        </p>

        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="metric" tick={{ fill: "#ccc", fontSize: 12 }} />
            <PolarRadiusAxis angle={30} domain={[0, 1]} tick={{ fill: "#888" }} />
            <Radar dataKey="value" stroke={chartColors.radar} fill={chartColors.radar} fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>

        <div className="flex items-center justify-between mt-4 text-sm">
          <span className="text-teal-400">Legend: Radar Area = Metric Score</span>
          <button
            onClick={() => downloadChart("radarChart")}
            className="underline text-teal-300"
          >
            ⬇ Export as PNG
          </button>
        </div>
      </div>

      {/* Bar Chart Section */}
      <div id="barChart" className="bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-2 font-mono">📊 Score Breakdown (Bar View)</h2>
        <p className="text-sm text-gray-400 mb-4">
          Visual comparison of individual metric scores. Hover to see values.
        </p>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="metric" stroke="#ccc" tick={{ fontSize: 12 }} />
            <YAxis domain={[0, 1]} stroke="#ccc" tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="value" fill={chartColors.bar} />
          </BarChart>
        </ResponsiveContainer>

        <div className="flex items-center justify-between mt-4 text-sm">
          <span className="text-indigo-300">Legend: Bar Height = Score</span>
          <button
            onClick={() => downloadChart("barChart")}
            className="underline text-indigo-300"
          >
            ⬇ Export as PNG
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChartSection;
