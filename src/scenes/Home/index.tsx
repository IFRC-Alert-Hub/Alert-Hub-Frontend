import {
  Autocomplete,
  Box,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import TitleHeader from "../../components/TitleHeader";
import MapComponent from "../../components/MapComponent/MapComponent";
import { useRef } from "react";
import { useIntl } from "react-intl";
import { useQuery } from "@apollo/client";
import { ALL_ALERTS } from "../../API/queries/getAllAlerts";
import CardCarousel from "../../components/Card/CardCarousel";
import { cardData } from "../Region";

const Home = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const { formatMessage } = useIntl();
  const { loading, error, data } = useQuery(ALL_ALERTS);

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
      <TitleHeader
        title="All ONGOING Exeme Alerts"
        rightTitle={"View all alerts"}
        rightLinkURL={"/alerts/all"}
      />
      <Box margin={"20px"} display="flex" flexDirection="row">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={[{ label: "Alert Type 1" }, { label: "Alert Type 2" }]}
          sx={{
            width: 200,
            backgroundColor: "#f4f4f4",
            "& .MuiAutocomplete-input": {
              padding: "4px",
            },
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Alert Type"
              size="small"
              sx={{
                "& .MuiInputLabel-root": { color: "#8D8D8D", fontSize: "12px" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#E0E3E7",
                  },
                  "&:hover fieldset": {
                    borderColor: "#B2BAC2",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#B2BAC2",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid #B2BAC2",
                  },
                },
              }}
            />
          )}
        />
      </Box>

      {loading && (
        <CircularProgress sx={{ textAlign: "center" }} color="secondary" />
      )}
      {error && <p>Error: {error.message}</p>}
      {!loading && !error && (
        <MapComponent
          mapContainerRef={mapContainerRef}
          mapRef={mapRef}
          alerts={data?.listAlert}
        />
      )}
    </Container>
  );
};

export default Home;
