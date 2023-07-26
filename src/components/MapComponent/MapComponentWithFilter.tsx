import React, { useEffect, useRef, useState } from "react";
import { Autocomplete, Box, TextField } from "@mui/material";
import mapboxgl from "mapbox-gl";

import DatePickerComponent from "../DatePicker/DatePicker";
import MapComponent, {
  AlertData,
  AlertInfoSet,
  Bbox,
  SourceFeed,
} from "./MapComponent";
import TitleHeader from "../Layout/TitleHeader";
import { useIntl } from "react-intl";
import Progress from "../Layout/Progress";

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
  const sourceAlerts = useRef<SourceFeed[] | null>(null);

  const [filteredAlerts, setFilteredAlerts] = useState<AlertData[]>(
    data?.listAlert ?? []
  );
  const [selectedUrgency, setSelectedUrgency] = useState<string>("");
  const [selectedSeverity, setSelectedSeverity] = useState<string>("");
  const [selectedCertainty, setSelectedCertainty] = useState<string>("");

  const [alertsLoading, setAlertsLoading] = useState<boolean>(true);
  const [selectedEffectiveDate, setSelectedEffectiveDate] = useState<
    [number | null, number | null] | undefined
  >([null, null]);

  const [selectedExpiryDate, setSelectedExpiryDate] = useState<
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

  const handleCertaintyChange = (
    event: React.ChangeEvent<{}>,
    value: string | null
  ) => {
    setSelectedCertainty(value || "");
  };

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
            newCountry?.multipolygon === "" ? "Polygon" : "MultiPolygon";
          const updatedCountry = { ...newCountry, countryPolygon, type };
          return { ...alert, country: updatedCountry };
        }
      );
    }
  }, [error, loading, data]);

  useEffect(() => {
    if (!loading && !error && data) {
      const uniqueSourceFeeds: any = [];
      const seenSourceUrls = new Set();

      data.listAlert.forEach((alert: AlertData) => {
        const sourceFeedString = JSON.stringify(alert.feed);
        const sourceFeed = JSON.parse(sourceFeedString);

        if (!seenSourceUrls.has(sourceFeed.url)) {
          seenSourceUrls.add(sourceFeed.url);
          uniqueSourceFeeds.push({
            url: sourceFeed.url,
            name: sourceFeed.name,
          });
        }
      });

      sourceAlerts.current = uniqueSourceFeeds;
      console.log(sourceAlerts.current);
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

      if (selectedCertainty !== "") {
        filteredData = filteredData.filter((alert: AlertData) =>
          alert?.alertinfoSet?.some(
            (infoSet: AlertInfoSet) =>
              infoSet.certainty?.toLowerCase() ===
              selectedCertainty.toLowerCase()
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

            if (
              selectedEffectiveDate &&
              selectedEffectiveDate[0] !== null &&
              selectedEffectiveDate[1] !== null &&
              effectiveTimestamp >= selectedEffectiveDate[0] &&
              effectiveTimestamp <= selectedEffectiveDate[1]
            ) {
              return true;
            }

            return false;
          })
        );
      }

      if (
        selectedExpiryDate &&
        selectedExpiryDate[0] !== null &&
        selectedExpiryDate[1] !== null
      ) {
        filteredData = filteredData.filter((alert: AlertData) =>
          alert?.alertinfoSet?.some((infoSet: AlertInfoSet) => {
            const expiresTimestamp =
              new Date(infoSet.expires as string).getTime() / 1000;
            if (
              selectedExpiryDate &&
              selectedExpiryDate[0] !== null &&
              selectedExpiryDate[1] !== null &&
              expiresTimestamp >= selectedExpiryDate[0] &&
              expiresTimestamp <= selectedExpiryDate[1]
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
    data,
    loading,
    error,
    selectedUrgency,
    selectedSeverity,
    selectedCertainty,
    selectedEffectiveDate,
    selectedExpiryDate,
  ]);

  const { formatMessage } = useIntl();

  return (
    <>
      <TitleHeader
        title={`${formatMessage({ id: "ALL_ONGOING_ALERTS" })} (${
          filteredAlerts.length
        })`}
        rightTitle={`${formatMessage({ id: "VIEW_ALL_ALERTS" })}`}
        rightLinkURL={"/alerts/all"}
        selectedFilter={selectedFilter}
        filterKey={filterKey}
      />
      {loading && alertsLoading && <Progress />}
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
            />
            <DatePickerComponent
              datePickerTitle="Effective"
              selectedDate={selectedEffectiveDate}
              setSelectedDate={setSelectedEffectiveDate}
            />
            <DatePickerComponent
              datePickerTitle="Expiry"
              selectedDate={selectedExpiryDate}
              setSelectedDate={setSelectedExpiryDate}
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
            sources={sourceAlerts?.current as SourceFeed[]}
          />
        </>
      )}
    </>
  );
};

export default MapComponentWithFilter;
