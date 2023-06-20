import React from "react";

import FilterableTableComponent from "./TableComponent";
import TitleHeader from "../../components/TitleHeader";
import { Container } from "@mui/material";

const AllAlerts: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ paddingTop: "30px" }}>
      <TitleHeader title="All Alerts (200)"></TitleHeader>
      <FilterableTableComponent />
    </Container>
  );
};

export default AllAlerts;
