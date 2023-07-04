import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { CircularProgress, Container } from "@mui/material";
import { useLocation } from "react-router-dom";
import { RowsData } from "./Table/Data";
import { ALL_ALERTS } from "../../API/queries/getAllAlerts";
import TitleHeader from "../../components/TitleHeader";
import FilterableTableComponent from "./Table/TableComponent";
import { cap_aggregator } from "../../API/API_Links";

interface AllAlertsProps {
  selectedFilter?: string;
  filterKey?: string;
}

function modifyDateTime(timestamp: string) {
  const date = new Date(timestamp);

  // Format the date and time as desired
  const formattedDateTime = date.toLocaleString("en-US");
  return formattedDateTime;
}

const AllAlerts: React.FC<AllAlertsProps> = () => {
  const location = useLocation();
  const { selectedFilter, filterKey } = location.state || {};

  const { loading, error, data } = useQuery(ALL_ALERTS, {
    client: cap_aggregator,
  });
  const [numAlerts, setNumAlerts] = useState<number>(0);

  const rowsData: RowsData[] = data?.listAlert?.map((alert: any) => ({
    region: alert.country?.region?.name,
    country: alert.country?.name,
    event: alert.event,
    severity: alert.severity,
    urgency: alert.urgency,
    certainty: alert.certainty,
    sender: alert.sender,
    effective: modifyDateTime(alert.effective!) || "",
    expires: modifyDateTime(alert.expires),
  }));

  return (
    <>
      <Container maxWidth="lg" sx={{ paddingTop: "30px" }}>
        <TitleHeader title={`All Alerts (${numAlerts})`} />
        {loading && (
          <CircularProgress sx={{ textAlign: "center" }} color="secondary" />
        )}
        {error && <p>Error: {error.message}</p>}
        {!loading && !error && (
          <FilterableTableComponent
            selectedFilter={selectedFilter}
            filterKey={filterKey}
            rowsData={rowsData}
            setNumAlerts={setNumAlerts}
          />
        )}
      </Container>
    </>
  );
};

export default AllAlerts;
