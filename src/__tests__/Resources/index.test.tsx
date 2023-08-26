import { render, screen } from "@testing-library/react";
import Resources from "../../scenes/Resources";

describe("Resources component", () => {
  it("renders the title correctly", () => {
    render(<Resources />);
    const titleElement = screen.getByRole("heading", {
      level: 1,
      name: /Resources/i,
    });
    expect(titleElement).toBeInTheDocument();
  });
});
