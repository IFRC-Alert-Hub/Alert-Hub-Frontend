import React from "react";
import { render } from "@testing-library/react";
import PageNotFound from "../../../scenes/404_Page";
import Provider from "../../IntlProvider/Provider";

describe("About Component", () => {
  it("renders the component without errors", () => {
    render(<Provider children={<PageNotFound />}></Provider>);
  });
});
