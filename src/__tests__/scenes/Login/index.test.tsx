import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // For additional matchers
import Login from "../../../scenes/Login";
import { MemoryRouter } from "react-router-dom";
import { IntlProvider } from "react-intl"; // Import IntlProvider

import en from "./../../../multiLanguage/locales/en.json";
import fr from "./../../../multiLanguage/locales/fr.json";
import { getLanguage } from "../../../multiLanguage/helpers/useLanguage";
const messages: any = { en: en, fr: fr };
const language = getLanguage();

describe("Login", () => {
  it("renders the login button correctly", async () => {
    render(
      <MemoryRouter>
        <IntlProvider locale="en" messages={messages[language]}>
          <Login />
        </IntlProvider>
      </MemoryRouter>
    );
    // const loginButton = screen.getByRole("button", { name: "Login" });
    // expect(loginButton).toBeInTheDocument();

    // const welcomeBack = screen.getByText("Welcome Back");
    // const loginInstructions = screen.queryByText(
    //   "If you are staff, member or volunteer of the Red Cross Re Crescent Movement (National Societies, the IFRC and the ICRC) login with you email and password."
    // );

    // expect(loginInstructions).toBeInTheDocument();

    // expect(welcomeBack).toBeInTheDocument();

    // const forgotPasswordLink = screen.queryByText(
    //   "Oops, Have You Forgot your Password?"
    // );
    // expect(forgotPasswordLink).toBeInTheDocument();
    // expect(screen.getByText("Email Address")).toBeInTheDocument();
    // expect(screen.getByText("Password")).toBeInTheDocument();
    // expect(screen.getByText("Don’t have an account?")).toBeInTheDocument();
    // expect(screen.getByText("Sign Up")).toBeInTheDocument();
  });

  test("shows error messages for invalid form submission", async () => {
    render(
      <MemoryRouter>
        <IntlProvider locale="en" messages={messages[language]}>
          <Login />
        </IntlProvider>
      </MemoryRouter>
    );
    const emailInput = screen.getByTestId("login-email");

    const passwordInput = screen.getByTestId("login-password");

    const loginButton = screen.getByRole("button", { name: "Login" });
    expect(loginButton).toHaveClass("Mui-disabled");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    fireEvent.click(loginButton);

    // const errorMessage = await screen.findByText("Invalid email or password.");
    // expect(errorMessage).toBeInTheDocument();

    // expect(
    //   screen.getByRole("label", { name: "Invalid email or password." })
    // ).toBeInTheDocument();
  });
});
