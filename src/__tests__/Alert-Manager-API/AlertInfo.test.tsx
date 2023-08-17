import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import axios from "axios";
import { AlertInfoTest } from "../../Alert-Manager-API/AlertInfo";

jest.mock("axios");

describe("AlertInfoTest", () => {
  it("renders the Alert Info correctly", () => {
    render(<AlertInfoTest />);
  });
  // it("fetches and displays alert info", async () => {
  //   const alertData = {
  //     id: 1,
  //     // ... other properties
  //   };

  //   axios.get.mockResolvedValue({
  //     data: alertData,
  //   });

  //   render(<AlertInfoTest />);

  //   // Wait for the data to load and render
  //   await waitFor(() => {
  //     expect(screen.getByText(alertData.id)).toBeInTheDocument();
  //   });
  // });

  it("displays an error message on fetch failure", async () => {
    const errorMessage = "Failed to fetch data.";
    axios.get.mockRejectedValue(new Error(errorMessage));

    render(<AlertInfoTest />);

    // Wait for the error to be displayed
    await waitFor(() => {
      expect(screen.getByText("Error")).toBeInTheDocument();
    });
  });
});
