import React, { useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

import TitleHeader from "../Layout/TitleHeader";
import { useIntl } from "react-intl";
import { Bbox, CountryRegionData } from "../../Alert-Manager-API/types";
import MapComponent from "./MapComponent";
import { Autocomplete, Box, Button, TextField } from "@mui/material";

interface MapComponentWithFilterProps {
  loading: boolean;
  error: string | null;
  data: CountryRegionData[];
  setFilters: any;

  boundingRegionCoordinates?: Bbox;
  filterKey?: string;
  selectedFilter?: string;

  isRegion?: boolean;
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
  loading,
  error,
  data,
  boundingRegionCoordinates = undefined,
  filterKey,
  selectedFilter,
  setFilters,
  isRegion = false,
}) => {
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
    // setFilters({
    //   urgency: selectedUrgency,
    //   severity: selectedSeverity,
    //   certainty: selectedCertainty,
    // });
  };

  const handleSeverityChange = (
    event: React.ChangeEvent<{}>,
    value: string | null
  ) => {
    setSelectedSeverity(value || "");
    // setFilters({
    //   urgency: selectedUrgency,
    //   severity: selectedSeverity,
    //   certainty: selectedCertainty,
    // });
  };

  const handleCertaintyChange = (
    event: React.ChangeEvent<{}>,
    value: string | null
  ) => {
    setSelectedCertainty(value || "");
    // setFilters({
    //   urgency: selectedUrgency,
    //   severity: selectedSeverity,
    //   certainty: selectedCertainty,
    // });
  };

  return (
    <>
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
              label={formatMessage({ id: "mapfilters.urgencyLabel" })}
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
          //disabled={countrySelected}
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
              label={formatMessage({ id: "mapfilters.severityLabel" })}
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
          // disabled={countrySelected}
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
              label={formatMessage({ id: "mapfilters.certaintyLabel" })}
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
          // disabled={countrySelected}
        />

        <Button color="secondary" onClick={handleSearch}>
          {formatMessage({ id: "mapfilters.search" })}
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
        boundingRegionCoordinates={boundingRegionCoordinates}
        isRegion={isRegion}
      />
    </>
  );
};

export default MapComponentWithFilter;
