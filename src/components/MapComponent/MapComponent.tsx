import React, { ReactElement, useEffect, useRef, useState } from "react";
import mapboxgl, { Map as MapboxMap } from "mapbox-gl";
import { Box, Dialog, Tab, Tabs } from "@mui/material";
import SourcesTableComponent from "../SourceTableComponent/SourceTableComponent";
import { PopupComponent } from "./PopupComponent/PopupComponent_new";

export const ExtremeThreatColour: string = "#f5333f";
export const ModerateThreatColour: string = "#ff9e00";
export const OtherAlertsColour: string = "#95BF6E";

export type Bbox = {
  type: string;
  coordinates: number[][][];
};
type MapProps = {
  lng?: number;
  lat?: number;
  zoom?: number;
  mapContainerRef: React.RefObject<HTMLDivElement>;
  mapRef: React.MutableRefObject<MapboxMap | null>;
  boundingRegionCoordinates?: Bbox;
  alerts?: AlertData[];
  countries?: CountryType[];
  alertsLoading: boolean;
  setAlertsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  sources?: SourceFeed[];
};

type Region = {
  centroid: string;
  id: string;
  name: string;
  polygon: string;
};

export type SourceFeed = {
  url?: string;
  name?: string;
};
type CountryType = {
  centroid?: string;
  id?: string;
  iso3?: string;
  name?: string;
  polygon?: string;
  multipolygon?: string;
  region?: Region[];
  type?: string;
  countryPolygon?: number[][];
};

export type AlertInfoSet = {
  web?: string;
  urgency?: string;
  audience?: string;
  category?: string;
  certainty?: string;
  contact?: string;
  effective?: string;
  event?: string;
  eventCode?: string;
  headline?: string;
  expires?: string;
  instruction?: string;
  language?: string;
  onset?: string;
  responseType?: string;
  senderName?: string;
  severity?: string;
  id?: string;
  description?: string;
};
export type AlertData = {
  status?: string;
  source?: string;
  sent?: string;
  sender?: string;
  references?: string;
  scope?: string;
  restriction?: string;
  note?: string;
  msgType?: string;
  incidents?: string;
  identifier?: string;
  code?: string;
  addresses?: string;
  id?: string;
  country?: CountryType;
  alertinfoSet?: AlertInfoSet[];
  feed?: SourceFeed;
};

const MapComponent: React.FC<MapProps> = ({
  lng = 0,
  lat = 0,
  zoom = 1,
  mapContainerRef,
  mapRef,
  alerts = [],
  countries = [],
  alertsLoading,
  setAlertsLoading,
  sources = [],
}) => {
  const [dialogLoaded, setDialogLoaded] = useState(false);
  const [tableID, setTableID] = useState<string>("");

  const countryTables = useRef<{
    [key: string]: { table: ReactElement; alerts: AlertData[] };
  }>({});

  const [value, setValue] = React.useState("map-tab");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  // useEffect(() => {
  //   console.log(value);
  //   console.log(mapContainerRef.current);
  //   console.log(alerts);
  // }, [value, mapContainerRef, alerts]);
  useEffect(() => {
    setAlertsLoading(true);

    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    if (value === "map-tab") {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current!,
        style: "mapbox://styles/go-ifrc/cki7aznup3hqz19rxliv3naf4",
        center: [lng, lat],
        zoom: zoom,
        scrollZoom: false,
        dragPan: true,
      });

      mapRef.current.addControl(new mapboxgl.FullscreenControl(), "top-left");
      mapRef.current.addControl(new mapboxgl.NavigationControl(), "top-left");
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [
    lat,
    value,
    lng,
    mapRef,
    mapContainerRef,
    zoom,
    alerts,
    setAlertsLoading,
  ]);

  // const determineColour = (currentColour: string, alert: AlertData) => {
  //   if (currentColour === ExtremeThreatColour) {
  //     return currentColour;
  //   } else {
  //     if (
  //       alert.urgency === "Immediate" ||
  //       alert.urgency === "Expected" ||
  //       alert.severity === "Extreme" ||
  //       alert.severity === "Severe" ||
  //       alert.certainty === "Observed" ||
  //       alert.certainty === "Likely"
  //     ) {
  //       return ExtremeThreatColour;
  //     }
  //   }
  //   return currentColour;
  // };

  // useEffect(() => {
  //   console.log("NEW: ", countryTables);
  // }, [countryTables]);

  // useEffect(() => {
  //   console.log("Alerts Loaded: ", alerts);
  // }, [alerts]);

  // useEffect(() => {
  //   console.log("Countries Loaded: ", countries);
  // }, [countries]);

  useEffect(() => {
    if (!mapRef.current || !alertsLoading || alerts.length === 0) {
      return;
    }
    if (value === "map-tab") {
      setAlertsLoading(true);

      mapRef.current?.on("load", () => {
        countryTables.current = {};

        alerts.forEach((alert: AlertData) => {
          const tableId = `alertTable-${alert?.country?.iso3}`;
          const tableData = countryTables.current[tableId];

          if (!tableData) {
            const table = <PopupComponent alerts={[alert]} />;
            countryTables.current[tableId] = { table, alerts: [alert] };
          } else {
            const updatedAlerts = [...tableData.alerts, alert];
            const updatedTable = React.cloneElement(tableData.table, {
              alerts: updatedAlerts,
            });
            countryTables.current[tableId] = {
              table: updatedTable,
              alerts: updatedAlerts,
            };
          }
          if (
            mapRef.current?.getSource(
              `polygon-source-${alert?.country?.iso3}`
            ) !== undefined
          ) {
            mapRef.current?.setPaintProperty(
              `polygon-layer-${alert?.country?.iso3}`,
              "fill-color",
              ExtremeThreatColour
            );
          } else {
            const sourceId = `polygon-source-${alert?.country?.iso3}`;
            const layerId = `polygon-layer-${alert?.country?.iso3}`;

            mapRef.current?.addSource(sourceId, {
              type: "geojson",

              data: {
                type: "Feature",
                geometry: {
                  type: alert?.country?.type! as any,
                  coordinates: alert?.country?.countryPolygon! as any,
                },
                properties: {},
              },
            });

            // const colour = determineColour(ModerateThreatColour, alert);

            // Add the border layer
            mapRef.current?.addLayer({
              id: `${layerId}-border`,
              type: "line",
              source: sourceId,
              paint: {
                "line-color": "black",
                "line-width": 1.3,
              },
            });
            mapRef.current?.addLayer({
              id: `${layerId}`,
              type: "fill",
              source: sourceId,
              paint: {
                "fill-color": ExtremeThreatColour,
                "fill-opacity": 0.8,
              },
            });

            mapRef.current?.on(
              "click",
              layerId,
              (e: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
                setDialogLoaded(true);
                setTableID(tableId);
              }
            );
          }
        });
        // console.log(countryTables.current);

        setAlertsLoading(false);
      });
    }
  }, [
    alertsLoading,
    setAlertsLoading,
    alerts,
    mapRef,
    countryTables,
    countries,
    value,
  ]);

  const handleCloseDialog = () => {
    setDialogLoaded(false);
  };

  return (
    <>
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab value="map-tab" label="Map" />
          <Tab value="source-tab" label="Sources" />
        </Tabs>

        {value === "map-tab" && (
          <Box p={3}>
            <div ref={mapContainerRef} className="map-container"></div>
          </Box>
        )}
        {value === "source-tab" && (
          <Box p={3}>
            <SourcesTableComponent sources={sources}></SourcesTableComponent>
          </Box>
        )}
      </Box>

      <Dialog
        PaperProps={{
          sx: {
            maxWidth: "800px",
            margin: "none !important",
          },
        }}
        open={dialogLoaded}
        onClose={handleCloseDialog}
      >
        {tableID ? (
          <PopupComponent alerts={countryTables.current[tableID].alerts} />
        ) : (
          ""
        )}
      </Dialog>
    </>
  );
};

export default MapComponent;
