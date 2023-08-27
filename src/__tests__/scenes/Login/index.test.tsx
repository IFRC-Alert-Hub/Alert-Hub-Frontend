import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // For additional matchers
import Login from "../../../scenes/Login";

import Provider from "../../../IntlProvider/Provider";

describe("Login", () => {
  it("renders the login button correctly", async () => {
    render(<Provider children={<Login />}></Provider>);
    const loginButton = screen.getByRole("button", { name: "Login" });
    expect(loginButton).toBeInTheDocument();

    const welcomeBack = screen.getByText("Welcome Back");
    const loginInstructions = screen.queryByText(
      "If you are staff, member or volunteer of the Red Cross Re Crescent Movement (National Societies, the IFRC and the ICRC) login with you email and password."
    );

    expect(loginInstructions).toBeInTheDocument();

    expect(welcomeBack).toBeInTheDocument();

    const forgotPasswordLink = screen.queryByText(
      "Oops, Have You Forgot your Password?"
    );
    expect(forgotPasswordLink).toBeInTheDocument();
    expect(screen.getByText("Email Address")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(screen.getByText("Don’t have an account?")).toBeInTheDocument();
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
  });
});
