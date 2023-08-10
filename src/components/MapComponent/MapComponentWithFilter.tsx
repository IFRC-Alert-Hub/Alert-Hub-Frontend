import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

import TitleHeader from "../Layout/TitleHeader";
import { useIntl } from "react-intl";
import { Bbox, CountryRegionData } from "../../Alert-Manager-API/types";
import MapComponent from "./MapComponent";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { useLevel1Data } from "../../Alert-Manager-API/Level1";

interface MapComponentWithFilterProps {
  boundingRegionCoordinates?: Bbox;
  filterKey?: string;
  selectedFilter?: string;
}
const urgencyOptions: string[] = [
  "Immediate",
  "Expected",
  "Future",
  "Past",
  "Unknown",
];
const severityOptions: string[] = [
  "Extreme",
  "Severe",
  "Moderate",
  "Minor",
  "Unknown",
];

const certaintyOptions: string[] = [
  "Observed",
  "Likely",
  "Possible",
  "Unlikely",
  "Unknown",
];

const MapComponentWithFilter: React.FC<MapComponentWithFilterProps> = ({
  boundingRegionCoordinates,
  filterKey,
  selectedFilter,
}) => {
  const { data, loading, error, setFilters } = useLevel1Data();

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  const { formatMessage } = useIntl();
  const [selectedUrgency, setSelectedUrgency] = useState<string>("");
  const [selectedSeverity, setSelectedSeverity] = useState<string>("");
  const [selectedCertainty, setSelectedCertainty] = useState<string>("");
  const [countrySelected, setCountrySelected] = useState<boolean>(false);

  const handleSearch = () => {
    setFilters({
      urgency: selectedUrgency,
      severity: selectedSeverity,
      certainty: selectedCertainty,
    });
  };
  const handleUrgencyChange = (
    event: React.ChangeEvent<{}>,
    value: string | null
  ) => {
    console.log(value);
    setSelectedUrgency(value || "");
  };

  const handleSeverityChange = (
    event: React.ChangeEvent<{}>,
    value: string | null
  ) => {
    setSelectedSeverity(value || "");
  };

  const handleCertaintyChange = (
    event: React.ChangeEvent<{}>,
    value: string | null
  ) => {
    setSelectedCertainty(value || "");
  };

  return (
    <>
      <TitleHeader
        title={`${formatMessage({ id: "ALL_ONGOING_ALERTS" })}`}
        rightTitle={`${formatMessage({ id: "VIEW_ALL_ALERTS" })}`}
        rightLinkURL={"/alerts/all"}
        selectedFilter={selectedFilter}
        filterKey={filterKey}
      />
      <Box padding={"20px"} display="flex" alignItems="center">
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
          value={selectedUrgency}
          isOptionEqualToValue={(option: any, value: any) => {
            if (option === null || value === null) {
              return option === value;
            }
            return option.value === value.value;
          }}
          disabled={countrySelected}
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
          isOptionEqualToValue={(option: any, value: any) => {
            if (option === null || value === null) {
              return option === value;
            }
            return option.value === value.value;
          }}
          disabled={countrySelected}
        />
        <Autocomplete
          disablePortal
          id="combo-box-certainty"
          options={certaintyOptions}
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
              label="Certainty"
              size="small"
              sx={{
                "& .MuiInputLabel-root": {
                  color: "#8D8D8D",
                  fontSize: "12px",
                },
              }}
            />
          )}
          onChange={handleCertaintyChange}
          isOptionEqualToValue={(option: any, value: any) => {
            if (option === null || value === null) {
              return option === value;
            }
            return option.value === value.value;
          }}
          disabled={countrySelected}
        />

        <Button color="secondary" onClick={handleSearch}>
          Search
        </Button>
      </Box>
      <MapComponent
        mapContainerRef={mapContainerRef}
        mapRef={mapRef}
        CountryRegionData={data}
        loading={loading}
        error={error}
        handleSearch={handleSearch}
        selectedUrgency={selectedUrgency}
        selectedSeverity={selectedSeverity}
        selectedCertainty={selectedCertainty}
        countrySelected={countrySelected}
        setCountrySelected={setCountrySelected}
      />
    </>
  );
};

export default MapComponentWithFilter;
