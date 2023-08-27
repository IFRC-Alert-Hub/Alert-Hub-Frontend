import React from "react";
import { render, screen } from "@testing-library/react";

import Home from "../../../scenes/Home";
import HomeSubscriptionCard from "../../../components/Card/HomeCards";
import Provider from "../../../IntlProvider/Provider";

describe("Home Component", () => {
  it("renders the component without errors", () => {
    render(<Provider children={<Home />}></Provider>);
  });

  it("renders the 'Home' section with the correct text", () => {
    render(<Provider children={<Home />}></Provider>);
    const titleElement = screen.getByRole("heading", { level: 1 });
    const subtitleElement = screen.getByRole("heading", { level: 6 });
    expect(titleElement).toBeInTheDocument();
    expect(subtitleElement).toBeInTheDocument();
  });

  it("renders HomeCards component", () => {
    render(<HomeSubscriptionCard />);
    const homeCardsElement = screen.getByTestId("mocked-home-cards");
    expect(homeCardsElement).toBeInTheDocument();
  });
});
