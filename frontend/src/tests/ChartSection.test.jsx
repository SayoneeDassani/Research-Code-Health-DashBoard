import { render, screen } from "@testing-library/react";
import ChartSection from "../src/ChartSection";

const mockScores = {
  readme_score: 1,
  test_score: 0.5,
  code_quality_score: 0.8,
  maintenance_score: 0.6,
  dependency_score: 1,
  modularity_score: 0.9,
  comments_style_score: 0.4,
};

test("renders Radar and Bar charts", () => {
  render(<ChartSection scores={mockScores} />);
  expect(screen.getByText("Radar Chart")).toBeInTheDocument();
});
