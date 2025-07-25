import { render, screen, fireEvent } from "@testing-library/react";
import Search from "../src/Search";

test("renders Search input and button", () => {
  render(<Search setScores={() => {}} setLoading={() => {}} />);
  const input = screen.getByPlaceholderText("Enter GitHub repo URL");
  expect(input).toBeInTheDocument();
  fireEvent.change(input, { target: { value: "https://github.com/user/repo" } });
  expect(input.value).toBe("https://github.com/user/repo");
});
