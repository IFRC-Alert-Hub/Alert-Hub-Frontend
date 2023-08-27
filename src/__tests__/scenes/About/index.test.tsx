import React from "react";
import { render, screen } from "@testing-library/react";
import About from "../../../scenes/About";

import { IntlProvider } from "react-intl"; // Import IntlProvider
import { MemoryRouter } from "react-router-dom";
import Provider from "../../../IntlProvider/Provider";

describe("About Component", () => {
  it("renders the component without errors", () => {
    render(<Provider children={<About />}></Provider>);
  });

  it("renders the 'The Problem' section with the correct text", () => {
    render(<Provider children={<About />}></Provider>);

    const problemHeading = screen.getByText(/The Problem/i);
    const problemText = screen.getByText(
      /Every year, millions of people are killed, injured, displaced or made poor by natural hazards whose impacts could have been prevented or reduced./i
    );

    expect(problemHeading).toBeInTheDocument();
    expect(problemText).toBeInTheDocument();
  });

  it("renders the 'The Solution' section with the correct text", () => {
    render(<Provider children={<About />}></Provider>);

    const solutionHeading = screen.getByText(/The Solution/i);
    const solutionText = screen.getByText(
      /The IFRC Alert Hub aims to address this situation by leveraging modern communications technology and proven international standards to increase the delivery of reliable, actionable emergency alerts and encourage anticipatory action by people in harm’s way./i
    );

    expect(solutionHeading).toBeInTheDocument();
    expect(solutionText).toBeInTheDocument();
  });

  it("renders the 'Disclaimer' section with the correct text", () => {
    render(<Provider children={<About />}></Provider>);

    const disclaimerHeading = screen.getByText(/Disclaimer/i);
    const disclaimerText = screen.getByText(
      /The IFRC Alert Hub publishes only official alerts issued by recognised government alerting agencies./i
    );

    expect(disclaimerHeading).toBeInTheDocument();
    expect(disclaimerText).toBeInTheDocument();
  });
});
