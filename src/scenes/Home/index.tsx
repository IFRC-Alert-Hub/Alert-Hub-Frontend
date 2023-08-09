import { Box, Container, Grid, Typography } from "@mui/material";
import { useIntl } from "react-intl";

import MapComponentWithFilter from "../../components/MapComponent/MapComponentWithFilter";
import HomeCards from "../../components/Card/HomeCards";

const Home = () => {
  const { formatMessage } = useIntl();

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

      <MapComponentWithFilter></MapComponentWithFilter>
    </Container>
  );
};

export default Home;
