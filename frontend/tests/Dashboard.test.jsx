import { render, screen } from "@testing-library/react";
import Dashboard from "../src/Dashboard";

const mockScores = {
  readme_score: 1,
  test_score: 0.5,
  code_quality_score: 0.8,
  maintenance_score: 0.6,
  dependency_score: 1,
  modularity_score: 0.9,
  comments_style_score: 0.4,
  suggestions: ["Add tests", "Improve documentation"],
};

test("renders Dashboard with scores and suggestions", () => {
  render(<Dashboard scores={mockScores} />);
  expect(screen.getByText("Improvement Suggestions")).toBeInTheDocument();
  expect(screen.getByText("Add tests")).toBeInTheDocument();
});
