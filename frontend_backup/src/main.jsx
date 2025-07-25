// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import Dashboard from './Dashboard';
import './index.css';

// Replace with actual fetched scores
const mockScores = {
  documentation_score: 8,
  testing_score: 5,
  comments_score: 3,
  code_quality_score: 7,
  modularity_score: 6,
  maintenance_score: 5,
  dependency_score: 6,
  total: 40
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Dashboard scores={mockScores} />
  </React.StrictMode>
);
