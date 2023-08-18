import { useState } from "react";
import EmailChangeModal from "../../../scenes/Profile/components/EmailChangeModal";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("Email change modal", () => {
  // const [isVerified, setIsVerified] = useState(true);
  const emailToken = "fewjios";

  it("render modal component", () => {
    render(
      <MemoryRouter>
        <EmailChangeModal
          isVerified={true}
          setIsVerified={() => false}
          emailToken={emailToken}
        />
      </MemoryRouter>
    );

    expect(screen.getByText("Modify Email")).toBeInTheDocument();
    expect(screen.getByText("Link")).toBeInTheDocument();
  });
});
