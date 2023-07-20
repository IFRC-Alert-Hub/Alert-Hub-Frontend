import { render } from "@testing-library/react";
import Login from "../../../scenes/Login";

describe("Login Component", () => {
  it("renders the component without errors", () => {
    render(<Login />);
  });
});
