import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

import TitleHeader from "../Layout/TitleHeader";
import { useIntl } from "react-intl";
import { Bbox, CountryRegionData } from "../../Alert-Manager-API/types";
import MapComponent from "./MapComponent";
import { Autocomplete, Box, TextField } from "@mui/material";
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
  const handleUrgencyChange = (
    event: React.ChangeEvent<{}>,
    value: string | null
  ) => {
    console.log(value);
    setSelectedUrgency(value || "");
    setFilters({
      urgency: value || "",
      severity: "",
      certainty: "",
    });
  };

  return (
    <>
      <TitleHeader
        title={`${formatMessage({ id: "ALL_ONGOING_ALERTS" })} (${200})`}
        rightTitle={`${formatMessage({ id: "VIEW_ALL_ALERTS" })}`}
        rightLinkURL={"/alerts/all"}
        selectedFilter={selectedFilter}
        filterKey={filterKey}
      />
      <Box padding={"20px"}>
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
        />
      </Box>

      <MapComponent
        mapContainerRef={mapContainerRef}
        mapRef={mapRef}
        CountryRegionData={data}
        loading={loading}
        error={error}
      />
    </>
  );
};

export default MapComponentWithFilter;
