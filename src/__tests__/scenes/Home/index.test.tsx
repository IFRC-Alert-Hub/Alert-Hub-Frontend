import React from "react";
import { render, screen } from "@testing-library/react";
import en from "../../../multiLanguage/locales/en.json";
import fr from "../../../multiLanguage/locales/fr.json";
import { getLanguage } from "../../../multiLanguage/helpers/useLanguage";
import { IntlProvider } from "react-intl"; // Import IntlProvider
import { MemoryRouter } from "react-router-dom";
import Home from "../../../scenes/Home";
import HomeSubscriptionCard from "../../../components/Card/HomeCards";

const messages: any = { en: en, fr: fr };
const language = getLanguage();
describe("Home Component", () => {
  it("renders the component without errors", () => {
    render(
      <MemoryRouter>
        <IntlProvider locale="en" messages={messages[language]}>
          <Home />
        </IntlProvider>
      </MemoryRouter>
    );
  });

  it("renders the 'Home' section with the correct text", () => {
    render(
      <MemoryRouter>
        <IntlProvider locale="en" messages={messages[language]}>
          <Home />
        </IntlProvider>
      </MemoryRouter>
    );
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
