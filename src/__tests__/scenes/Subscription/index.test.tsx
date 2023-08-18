import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderer from "react-test-renderer";
import Subscription from "../../../scenes/Subscription";

describe("Subscription", () => {
  it("render Subscription component", () => {
    render(<Subscription />);

    expect(screen.getByText("My Subscriptions")).toBeInTheDocument();
    expect(screen.getByText("Add")).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});

describe("Subscirption Snapshot", () => {
  it("should match DOM snapshot", () => {
    const tree = renderer.create(<Subscription />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
