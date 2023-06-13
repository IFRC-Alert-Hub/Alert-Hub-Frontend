import { Box, Container, Grid, Typography } from "@mui/material";
import TitleHeader from "../../components/TitleHeader";
import Map from "./Map";

const Home = () => {
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
          IFRC Alert Hub
        </Typography>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={10} md={8} lg={6}>
            <Typography
              fontWeight={300}
              variant="h6"
              textAlign="center"
              sx={{ margin: "0 20px" }}
            >
              IFRC GO aims to make all disaster information universally
              accessible and useful to IFRC responders for better decision
              making.
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <TitleHeader
        title="ONGOING Extreme Alerts"
        rightTitle={"View all alerts"}
        rightLinkURL={"/View all alerts"}
      />
      <Map zoom={1} />;
    </Container>
  );
};

export default Home;
