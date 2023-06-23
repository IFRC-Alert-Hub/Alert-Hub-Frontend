import React from "react";

import FilterableTableComponent from "./Table/TableComponent";
import TitleHeader from "../../components/TitleHeader";
import { Container } from "@mui/material";
import { useLocation } from "react-router-dom";

interface AllAlertsProps {
  selectedFilter?: string;
  filterKey?: string;
}
const AllAlerts: React.FC<AllAlertsProps> = () => {
  const location = useLocation();
  const { selectedFilter, filterKey } = location.state || {};

  return (
    <>
      <Container maxWidth="lg" sx={{ paddingTop: "30px" }}>
        <TitleHeader title="All Alerts (200)"></TitleHeader>
        <FilterableTableComponent
          selectedFilter={selectedFilter}
          filterKey={filterKey}
        />
      </Container>
    </>
  );
};

export default AllAlerts;
