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
import { useEffect, useRef, useState } from "react";
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

  const [selectedUrgency, setSelectedUrgency] = useState("");
  const [filteredAlerts, setFilteredAlerts] = useState(data?.listAlert || []);
  const handleUrgencyChange = (event: any, value: any) => {
    setSelectedUrgency(value || "");
  };

  const urgencyOptions = ["Future", "Past", "Unknown", "Immediate"];
  useEffect(() => {
    if (!loading && !error) {
      let filteredData = data?.listAlert || [];

      if (selectedUrgency !== "") {
        filteredData = filteredData.filter(
          (alert: any) => alert.urgency === selectedUrgency
        );
      }

      setFilteredAlerts(filteredData);
    }
  }, [selectedUrgency, data, loading, error]);
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
      <Box
        display="flex"
        flexDirection="row"
        marginBottom="20px"
        marginTop="20px"
      >
        {/* <Autocomplete
          disablePortal
          disabled
          id="combo-box-demo"
          options={[{ label: "Fire" }, { label: "Floods" }]}
          value={{ label: "Floods" }}
          sx={{
            width: 170,
            backgroundColor: "#f4f4f4",
            "& .MuiAutocomplete-input": {
              padding: "4px",
            },
            marginRight: "20px",
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Alert Type"
              size="small"
              sx={{
                "& .MuiInputLabel-root": { color: "#8D8D8D", fontSize: "12px" },
              }}
            />
          )}
        /> */}
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={urgencyOptions}
          getOptionLabel={(option) => option}
          sx={{
            width: 170,
            backgroundColor: "#f4f4f4",
            "& .MuiAutocomplete-input": {
              padding: "4px",
            },
            marginRight: "20px",
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Urgency"
              size="small"
              sx={{
                "& .MuiInputLabel-root": {
                  color: "#8D8D8D",
                  fontSize: "12px",
                },
              }}
            />
          )}
          onChange={handleUrgencyChange}
        />
        {/* <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={[{ label: "Filter Type 1" }, { label: "Filter Type 2" }]}
          sx={{
            width: 170,
            backgroundColor: "#f4f4f4",
            "& .MuiAutocomplete-input": {
              padding: "4px",
            },
            marginRight: "20px",
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Filter Type"
              size="small"
              sx={{
                "& .MuiInputLabel-root": { color: "#8D8D8D", fontSize: "12px" },
              }}
            />
          )}
        /> */}
      </Box>

      {loading && (
        <CircularProgress sx={{ textAlign: "center" }} color="secondary" />
      )}
      {error && <p>Error: {error.message}</p>}
      {!loading && !error && (
        <MapComponent
          mapContainerRef={mapContainerRef}
          mapRef={mapRef}
          alerts={filteredAlerts}
        />
      )}
    </Container>
  );
};

export default Home;
