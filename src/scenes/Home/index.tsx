import { Box, Container, Grid, Tab, Tabs, Typography } from "@mui/material";
import { useIntl } from "react-intl";

import MapComponentWithFilter from "../../components/MapComponent/MapComponentWithFilter";
import HomeCards from "../../components/Card/HomeCards";
import { useLevel1Data } from "../../APIs/Alert-Manager-API/Level1";
import { useState } from "react";
import TitleHeader from "../../components/Layout/TitleHeader";
import AllAlerts from "../AllAlerts";
import { GetAllAlerts } from "../../APIs/Alert-Manager-API/AllAlerts";

const Home = () => {
  const { formatMessage } = useIntl();
  const { data, loading, error, setFilters } = useLevel1Data();
  const [value, setValue] = useState("map-tab");
  const {
    data: alertsData,
    loading: loadingAlerts,
    error: ErrorAlerts,
  } = GetAllAlerts();
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Container maxWidth="lg">
      <Box sx={{ padding: "50px 0 50px 0" }}>
        <Typography
          variant="h1"
          textAlign={"center"}
          fontWeight={"bold"}
          paddingBottom={"15px"}
          textTransform={"capitalize"}
          letterSpacing={"1.6px"}
        >
          {formatMessage({ id: "home.title" })}
        </Typography>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={10} md={8} lg={6}>
            <Typography
              fontWeight={300}
              variant="h6"
              textAlign="center"
              sx={{ margin: "0 20px" }}
            >
              {formatMessage({ id: "home.subtitle" })}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <HomeCards />

      <TitleHeader
        title={`${formatMessage({ id: "ALL_ONGOING_ALERTS" })} (${
          !loadingAlerts && !ErrorAlerts && alertsData.length > 0
            ? `${alertsData.length}`
            : "0"
        })`}
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
        />
      </Box>
      <Box sx={{ display: value === "table-tab" ? "block" : "none" }}>
        <AllAlerts />
      </Box>
    </Container>
  );
};

export default Home;
