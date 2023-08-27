import React from "react";
import { render } from "@testing-library/react";
import Footer from "../../../components/Footer/Footer";
import Provider from "../../../IntlProvider/Provider";

describe("About Component", () => {
  it("renders the component without errors", () => {
    render(<Provider children={<Footer />}></Provider>);
  });
});
