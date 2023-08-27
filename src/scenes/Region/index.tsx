import { Box, Container, Tab, Tabs, Typography } from "@mui/material";
import { Navigate, useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { GetRegionData } from "../../APIs/Alert-Manager-API/Region";
import MapComponentWithFilter from "../../components/MapComponent/MapComponentWithFilter";
import TitleHeader from "../../components/Layout/TitleHeader";
import { useIntl } from "react-intl";
import AllAlerts from "../AllAlerts";

const Region = () => {
  const { id } = useParams<string>();
  const { data, loading, error, setFilters, refetch } = GetRegionData();
  const { formatMessage } = useIntl();
  const [value, setValue] = useState("map-tab");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useMemo(() => {
    refetch(Number(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const regions = [
    {
      name: "Africa",
      id: "1",
    },
    {
      name: "Americas",
      id: "2",
    },
    {
      name: "Asia Pacific",
      id: "3",
    },
    {
      name: "Europe",
      id: "4",
    },
    {
      name: "Middle East & North Africa",
      id: "5",
    },
  ];
  const selectedRegion = regions.find((region) => region.id === id);
  if (!selectedRegion) {
    return <Navigate to="/404" />;
  }

  return (
    <>
      <Container maxWidth="lg">
        <>
          <Container maxWidth="lg">
            <Box sx={{ padding: "50px 0 30px 0" }}>
              <Typography
                variant="h1"
                textAlign="center"
                fontWeight="bold"
                textTransform="capitalize"
                letterSpacing="1.6px"
              >
                {selectedRegion ? selectedRegion.name : "Region Not Found"}
              </Typography>
            </Box>
          </Container>
        </>

        <TitleHeader
          title={`${formatMessage({ id: "ALL_ONGOING_ALERTS" })}`}
          rightTitle={`${formatMessage({ id: "VIEW_ALL_SOURCES" })}`}
          rightLinkURL={"/feeds"}
        />
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab value="map-tab" label="Map" />
          <Tab value="table-tab" label="Table" />
        </Tabs>

        <Box sx={{ display: value === "map-tab" ? "block" : "none" }}>
          <MapComponentWithFilter
            data={data}
            loading={loading}
            error={error}
            setFilters={setFilters}
            isRegion={true}
          />
        </Box>
        <Box sx={{ display: value === "table-tab" ? "block" : "none" }}>
          <AllAlerts filterKey="region" selectedFilter={selectedRegion.name} />
        </Box>
      </Container>
    </>
  );
};

export default Region;
