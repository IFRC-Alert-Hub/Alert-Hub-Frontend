import React from "react";
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

  it("renders within a Container with 'lg' maxWidth", () => {
    render(<Resources />);
    const containerElement = screen.getByTestId("resources-container");
    expect(containerElement).toBeInTheDocument();
    expect(containerElement).toHaveStyle("max-width: 1280px");
  });
});
