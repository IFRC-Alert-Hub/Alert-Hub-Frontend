import {
  Autocomplete,
  Box,
  CircularProgress,
  Container,
  TextField,
} from "@mui/material";
import MapComponent, { AlertData, Bbox } from "./MapComponent";
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

import TitleHeader from "../TitleHeader";
import DatePickerComponent from "../DatePicker/DatePicker";

interface MapComponentWithFilterProps {
  loading: boolean;
  error: any;
  data: any;
  boundingRegionCoordinates?: Bbox;
  filterKey?: string;
  selectedFilter?: string;
}

const MapComponentWithFilter: React.FC<MapComponentWithFilterProps> = ({
  loading,
  error,
  data,
  boundingRegionCoordinates,
  filterKey,
  selectedFilter,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  const [filteredAlerts, setFilteredAlerts] = useState<AlertData[]>(
    data?.listAlert.filter((data: AlertData) => {
      return data.alertinfoSet && data.alertinfoSet.length > 0;
    }) || []
  );
  const [selectedUrgency, setSelectedUrgency] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState("");

  const [selectedEffectiveDate, setSelectedEffectiveDate] = useState<
    [number | null, number | null] | undefined
  >([null, null]);

  const handleUrgencyChange = (event: any, value: any) => {
    setSelectedUrgency(value || "");
  };

  const handleSeverityChange = (event: any, value: any) => {
    setSelectedSeverity(value || "");
  };

  const urgencyOptions = ["Future", "Past", "Unknown", "Immediate"];
  const severityOptions = ["Moderate", "Minor", "Unknown", "Severe"];

  useEffect(() => {
    if (!loading && !error) {
      let filteredData = data?.listAlert || [];

      if (selectedUrgency !== "") {
        filteredData = filteredData.filter(
          (alert: AlertData) =>
            alert.alertinfoSet![0].urgency === selectedUrgency
        );
      }

      if (selectedSeverity !== "") {
        filteredData = filteredData.filter(
          (alert: AlertData) =>
            alert.alertinfoSet![0].severity === selectedSeverity
        );
      }

      if (
        selectedEffectiveDate &&
        selectedEffectiveDate[0] !== null &&
        selectedEffectiveDate[1] !== null
      ) {
        filteredData = filteredData.filter((alert: AlertData) => {
          let effectiveTimestamp =
            new Date(alert.alertinfoSet![0].effective as string).getTime() /
            1000;
          let expiresTimestamp =
            new Date(alert.alertinfoSet![0].effective as string).getTime() /
            1000;

          if (
            selectedEffectiveDate &&
            selectedEffectiveDate[0] !== null &&
            selectedEffectiveDate[1] !== null &&
            effectiveTimestamp >= selectedEffectiveDate[0] &&
            expiresTimestamp <= selectedEffectiveDate[1]
          ) {
            return true;
          }

          return false;
        });
      }

      setFilteredAlerts(filteredData);
    }
  }, [
    selectedUrgency,
    selectedSeverity,
    data,
    loading,
    error,
    selectedEffectiveDate,
  ]);

  return (
    <Container maxWidth="lg">
      <TitleHeader
        title={`All ONGOING Extreme Alerts (${filteredAlerts.length})`}
        rightTitle={"View all alerts"}
        rightLinkURL={"/alerts/all"}
        selectedFilter={selectedFilter}
        filterKey={filterKey}
      />
      {loading && (
        <CircularProgress sx={{ textAlign: "center" }} color="secondary" />
      )}
      {error && <p>Error: {error.message}</p>}
      {!loading && !error && (
        <>
          <Box
            display="flex"
            flexDirection="row"
            marginBottom="20px"
            marginTop="20px"
          >
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
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={severityOptions}
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
                  label="Severity"
                  size="small"
                  sx={{
                    "& .MuiInputLabel-root": {
                      color: "#8D8D8D",
                      fontSize: "12px",
                    },
                  }}
                />
              )}
              onChange={handleSeverityChange}
            />
            <DatePickerComponent
              datePickerTitle="Effective"
              selectedDate={selectedEffectiveDate}
              setSelectedDate={setSelectedEffectiveDate}
            />
          </Box>{" "}
          <MapComponent
            mapContainerRef={mapContainerRef}
            mapRef={mapRef}
            alerts={filteredAlerts}
            countries={data?.listCountry}
            boundingRegionCoordinates={boundingRegionCoordinates || undefined}
          />
        </>
      )}
    </Container>
  );
};

export default MapComponentWithFilter;
