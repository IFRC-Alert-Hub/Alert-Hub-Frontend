import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { Container } from "@mui/material";
import { useLocation } from "react-router-dom";
import { RowsData } from "./Table/Data";
import FilterableTableComponent from "./Table/TableComponent";
import { cap_aggregator } from "../../API/API_Links";
import { ALL_ALERTS } from "../../API/ALL_QUERIES";
import TitleHeader from "../../components/Layout/TitleHeader";
import { useIntl } from "react-intl";
import Progress from "../../components/Layout/Progress";

interface AllAlertsProps {
  selectedFilter?: string;
  filterKey?: string;
}

const AllAlerts: React.FC<AllAlertsProps> = () => {
  const location = useLocation();
  const { selectedFilter, filterKey } = location.state || {};
  const { formatMessage } = useIntl();

  const { loading, error, data } = useQuery(ALL_ALERTS, {
    client: cap_aggregator,
  });
  const [numAlerts, setNumAlerts] = useState<number>(0);

  const rowsData: RowsData[] = data?.listAlert?.map((alert: any) => ({
    identifier: alert.identifier! || "",
    event: alert.alertinfoSet[0]?.event || "",
    eventCategory: alert.alertinfoSet[0]?.category || "",
    sent: alert.sent!,
    sender: alert.sender,
    region: alert.country?.region?.name,
    country: alert.country?.name,
    infoSet: alert.country?.alertinfoSet || [],
  }));

  return (
    <>
      <Container maxWidth="lg" sx={{ paddingTop: "30px" }}>
        <TitleHeader
          title={`${formatMessage({ id: "ALL_ALERTS" })} (${numAlerts})`}
        />
        {loading && <Progress />}
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
