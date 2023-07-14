import React, { useEffect, useRef, useState } from "react";
import {
  Autocomplete,
  Box,
  CircularProgress,
  Container,
  TextField,
} from "@mui/material";
import mapboxgl from "mapbox-gl";

import TitleHeader from "../TitleHeader";
import DatePickerComponent from "../DatePicker/DatePicker";
import MapComponent, { AlertData, AlertInfoSet, Bbox } from "./MapComponent";

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
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  const originalAlerts = useRef<AlertData[] | null>(null);
  const [filteredAlerts, setFilteredAlerts] = useState<AlertData[]>(
    data?.listAlert || []
  );
  const [selectedUrgency, setSelectedUrgency] = useState<string>("");
  const [selectedSeverity, setSelectedSeverity] = useState<string>("");
  const [alertsLoading, setAlertsLoading] = useState<boolean>(true);
  const [selectedEffectiveDate, setSelectedEffectiveDate] = useState<
    [number | null, number | null] | undefined
  >([null, null]);

  const handleUrgencyChange = (
    event: React.ChangeEvent<{}>,
    value: string | null
  ) => {
    setSelectedUrgency(value || "");
  };

  const handleSeverityChange = (
    event: React.ChangeEvent<{}>,
    value: string | null
  ) => {
    setSelectedSeverity(value || "");
  };

  const urgencyOptions: string[] = ["Future", "Past", "Unknown", "Immediate"];
  const severityOptions: string[] = ["Moderate", "Minor", "Unknown", "Severe"];

  useEffect(() => {
    if (!loading && !error && data) {
      originalAlerts.current = (data?.listAlert || []).map(
        (alert: AlertData) => {
          const newCountry = data?.listCountry?.find(
            (country: any) => country?.id === alert?.country?.id
          );
          const countryPolygon =
            newCountry?.multipolygon === ""
              ? JSON.parse(newCountry?.polygon || "[]")
              : JSON.parse(newCountry?.multipolygon || "[]");
          const type =
            alert?.country?.multipolygon === "Polygon"
              ? "Polygon"
              : "MultiPolygon";
          const updatedCountry = { ...newCountry, countryPolygon, type };
          return { ...alert, country: updatedCountry };
        }
      );
    }
  }, [error, loading, data]);

  useEffect(() => {
    if (!loading && !error && originalAlerts.current) {
      let filteredData = originalAlerts.current || [];
      if (selectedUrgency !== "") {
        filteredData = filteredData.filter((alert: AlertData) =>
          alert?.alertinfoSet?.some(
            (infoSet: AlertInfoSet) =>
              infoSet.urgency?.toLowerCase() === selectedUrgency.toLowerCase()
          )
        );
      }

      if (selectedSeverity !== "") {
        filteredData = filteredData.filter((alert: AlertData) =>
          alert?.alertinfoSet?.some(
            (infoSet: AlertInfoSet) =>
              infoSet.severity?.toLowerCase() === selectedSeverity.toLowerCase()
          )
        );
      }

      if (
        selectedEffectiveDate &&
        selectedEffectiveDate[0] !== null &&
        selectedEffectiveDate[1] !== null
      ) {
        filteredData = filteredData.filter((alert: AlertData) =>
          alert?.alertinfoSet?.some((infoSet: AlertInfoSet) => {
            const effectiveTimestamp =
              new Date(infoSet.effective as string).getTime() / 1000;
            const expiresTimestamp =
              new Date(infoSet.expires as string).getTime() / 1000;
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
          })
        );
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
      {loading && alertsLoading && (
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
              id="combo-box-urgency"
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
              id="combo-box-severity"
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
          </Box>
          <MapComponent
            mapContainerRef={mapContainerRef}
            mapRef={mapRef}
            alerts={filteredAlerts}
            countries={data?.listCountry}
            boundingRegionCoordinates={boundingRegionCoordinates}
            alertsLoading={alertsLoading}
            setAlertsLoading={setAlertsLoading}
          />
        </>
      )}
    </Container>
  );
};

export default MapComponentWithFilter;
