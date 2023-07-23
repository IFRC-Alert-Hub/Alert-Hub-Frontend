import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // For additional matchers
import Login from "../../../scenes/Login";

describe("Login Component", () => {
  test("renders login form elements", () => {
    render(<Login />);

    expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Forgot your Password?" })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Sign up" })).toBeInTheDocument();
  });

  test("allows the user to type into email and password fields", () => {
    render(<Login />);

    fireEvent.change(screen.getByLabelText("Email Address"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "test123" },
    });

    expect(screen.getByLabelText("Email Address")).toHaveValue(
      "test@example.com"
    );
    expect(screen.getByLabelText("Password")).toHaveValue("test123");
  });

  test("shows error messages for invalid form submission", async () => {
    render(<Login />);

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    expect(
      await screen.findByText("Invalid email or password.")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Invalid email or password.")
    ).toBeInTheDocument();
  });
});
