import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders search textbox", () => {
  render(<App />);
  const searchElement = screen.getByPlaceholderText(/Enter a card name/i);
  expect(searchElement).toBeInTheDocument();
});
