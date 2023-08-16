/* eslint-disable testing-library/no-unnecessary-act */
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Profile from "../../../scenes/Profile";

describe("Proifle", () => {
  it("render Profile component", () => {
    render(<Profile />);

    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect(screen.getByText("Edit Profile")).toBeInTheDocument();
    expect(screen.getByText("Switch")).toBeInTheDocument();
    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
    expect(screen.getByLabelText("City")).toBeInTheDocument();
    expect(screen.getByLabelText("Country")).toBeInTheDocument();
    expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
  });

  it("click edit button and change profile", async () => {
    render(<Profile />);

    await act(() => {
      userEvent.click(screen.getByText("Edit Profile"));
    });
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
    expect(screen.getByText("Switch")).toBeDisabled();

    await act(() => {
      userEvent.type(screen.getByText("First Name"), "test first name");
      userEvent.type(screen.getByText("Last Name"), "test last name");
      userEvent.type(screen.getByText("City"), "test city");
      userEvent.type(screen.getByText("Country"), "test country");
    });
    expect(screen.getByLabelText("First Name")).toHaveValue("test first name");
    expect(screen.getByLabelText("Last Name")).toHaveValue("test last name");
    expect(screen.getByLabelText("City")).toHaveValue("test city");
    expect(screen.getByLabelText("Country")).toHaveValue("test country");
  });

  it("click switch button and show the security modal", () => {
    render(<Profile />);

    act(() => {
      userEvent.click(screen.getByText("Switch"));
    });
    expect(screen.getByText("Security Verification")).toBeInTheDocument();
  });

  it("shows error messages when clicking next button without code", async () => {
    render(<Profile />);

    act(() => {
      userEvent.click(screen.getByText("Switch"));
    });
    act(() => {
      userEvent.click(screen.getByText("Next"));
    });
    const errorContent = await screen.findByText("Please enter the code");
    expect(errorContent).toBeInTheDocument();
  });
});
