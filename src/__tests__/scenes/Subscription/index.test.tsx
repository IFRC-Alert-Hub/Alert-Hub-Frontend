import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Subscription from "../../../scenes/Subscription";
import SubscriptionTable from "../../../scenes/Subscription/components/SubscriptionTable";

describe("Subscription", () => {
  it("render Subscription component", () => {
    render(<Subscription />);

    expect(screen.getByText("My Subscriptions")).toBeInTheDocument();
    expect(screen.getByText("Add")).toBeInTheDocument();
  });
});
