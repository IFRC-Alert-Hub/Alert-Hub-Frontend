import renderer from "react-test-renderer";
import SubscriptionAlerts from "../../../scenes/SubscriptionAlerts";

describe("SubscirptionAlerts Snapshot", () => {
  it("should match DOM snapshot", () => {
    const tree = renderer.create(<SubscriptionAlerts />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
