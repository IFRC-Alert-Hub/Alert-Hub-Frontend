import React from "react";
import { render, screen } from "@testing-library/react";
import About from "../../../scenes/About";
import en from "../../../multiLanguage/locales/en.json";
import fr from "../../../multiLanguage/locales/fr.json";
import { getLanguage } from "../../../multiLanguage/helpers/useLanguage";
import { IntlProvider } from "react-intl"; // Import IntlProvider
import { MemoryRouter } from "react-router-dom";
import Footer from "../../../components/Footer/Footer";

const messages: any = { en: en, fr: fr };
const language = getLanguage();
describe("About Component", () => {
  it("renders the component without errors", () => {
    render(
      <MemoryRouter>
        <IntlProvider locale="en" messages={messages[language]}>
          <Footer />
        </IntlProvider>
      </MemoryRouter>
    );
  });
});
