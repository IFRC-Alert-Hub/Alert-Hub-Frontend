import React, { useState } from "react";
import { Container } from "@mui/material";
import { useLocation } from "react-router-dom";
import { RowsData } from "./Table/Data";
import FilterableTableComponent from "./Table/TableComponent";
import TitleHeader from "../../components/Layout/TitleHeader";
import { useIntl } from "react-intl";
import Progress from "../../components/Layout/Progress";
import { GetAllAlerts } from "../../Alert-Manager-API/AllAlerts";
import { Alert } from "../../Alert-Manager-API/types";

interface AllAlertsProps {
  selectedFilter?: string;
  filterKey?: string;
}

const AllAlerts: React.FC<AllAlertsProps> = ({ selectedFilter, filterKey }) => {
  const location = useLocation();
  const { formatMessage } = useIntl();

  const { data, loading, error } = GetAllAlerts();
  const [numAlerts, setNumAlerts] = useState<number>(0);

  const rowsData: RowsData[] = data?.map((alert: Alert) => ({
    identifier: alert.identifier! || "",
    event: alert.info![0]?.event || "",
    eventCategory: alert.info![0]?.category || "",
    sent: alert.sent!,
    sender: alert.sender,
    region: alert.region as any,
    country: alert.country as any,
    id: alert.id as unknown as string,
    admin1s:
      (alert.admin1 as [string]).length > 0
        ? ((alert.admin1 as [string]).join(", ") as any)
        : "",
    //infoSet: alert.country?.alertinfoSet || [],
  }));

  return (
    <>
      <Container maxWidth="lg" sx={{ paddingTop: "30px" }}>
        <TitleHeader
          title={`${formatMessage({ id: "ALL_ALERTS" })} (${numAlerts})`}
        />
        {loading && <Progress />}
        {error && <p>Error: {error}</p>}
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
