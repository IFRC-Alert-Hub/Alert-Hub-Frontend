import { Box, Container, Grid, Typography } from "@mui/material";
import TitleHeader from "../../components/TitleHeader";
import { useIntl } from "react-intl";
import { useQuery } from "@apollo/client";
import { ALL_ALERTS } from "../../API/queries/getAllAlerts";
import CardCarousel from "../../components/Card/CardCarousel";
import { cardData } from "../Region";
import { cap_aggregator } from "../../API/API_Links";
import MapComponentWithFilter from "../../components/MapComponent/MapComponentWithFilter";

const Home = () => {
  const { formatMessage } = useIntl();
  const { loading, error, data } = useQuery(ALL_ALERTS, {
    client: cap_aggregator,
  });



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
      <TitleHeader
        title="ONGOING Extreme Alerts"
        rightTitle={"View all alerts"}
        rightLinkURL={"/alerts/all"}
      />
      <Box margin={"0px 25px 25px"}>
        <CardCarousel cards={cardData} />
      </Box>

      <MapComponentWithFilter
        data={data}
        loading={loading}
        error={error}
      ></MapComponentWithFilter>
    </Container>
  );
};

export default Home;
