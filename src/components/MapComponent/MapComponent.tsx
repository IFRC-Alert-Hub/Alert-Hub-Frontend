import React, { ReactElement, useEffect, useRef, useState } from "react";
import mapboxgl, { LngLatBoundsLike, Map as MapboxMap } from "mapbox-gl";
import { Box, Skeleton, Tab, Tabs, Typography } from "@mui/material";
import SourcesTableComponent from "../SourceTableComponent/SourceTableComponent";
import { PopupComponent } from "./PopupComponent/PopupComponent_new";
import Progress from "../Layout/Progress";
import turfBbox from "@turf/bbox";
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
  loading?: any;
  error?: any;
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
  url?: string;
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
  loading,
  error,
  boundingRegionCoordinates = undefined,
}) => {
  const [tableID, setTableID] = useState<string>("");
  const [isPolygonClicked, setPolygonClicked] = useState(false);

  const countryTables = useRef<{
    [key: string]: { table: ReactElement; alerts: AlertData[] };
  }>({});

  const [value, setValue] = React.useState("map-tab");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleClose = () => {
    setPolygonClicked(false);
    mapContainerRef.current!.style.width = "100%";

    mapContainerRef.current!.classList.add("map-container-transition");

    setTimeout(() => {
      mapRef.current!.resize();
      mapRef.current?.setCenter([0, 0]);
      mapRef.current?.setZoom(1);

      mapContainerRef.current!.classList.remove("map-container-transition");
    }, 300);
  };

  useEffect(() => {
    if (mapRef.current) {
      if (mapContainerRef.current) {
        mapRef.current!.resize();
      }
    }
  }, [isPolygonClicked, mapContainerRef, mapRef]);

  useEffect(() => {
    setAlertsLoading(true);

    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    if (value === "map-tab") {
      console.log("SOURCES: ", sources);
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current!,
        style: "mapbox://styles/go-ifrc/cki7aznup3hqz19rxliv3naf4",
        center: [lng, lat],
        zoom: zoom,
        scrollZoom: false,
        dragPan: true,
      });
      mapRef.current!.resize();
      console.log("boundingRegion Coord: ", boundingRegionCoordinates);
      if (
        boundingRegionCoordinates !== undefined &&
        boundingRegionCoordinates !== null
      ) {
        const mapBoundingBox = turfBbox(boundingRegionCoordinates);
        const [minX, minY, maxX, maxY] = mapBoundingBox;

        mapRef.current!.fitBounds(
          [minX, minY, maxX, maxY] as LngLatBoundsLike,
          {
            padding: { top: 10, bottom: 25, left: 15, right: 5 },
          }
        );
      }

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
    boundingRegionCoordinates,
    sources,
  ]);

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
                setPolygonClicked(true);
                setTableID(tableId);
                mapContainerRef.current!.style.width = "35%";
                mapRef.current!.resize();
                console.log(alert.country);
                const mapBoundingBox = turfBbox({
                  type: "Feature",
                  geometry: {
                    type: alert?.country?.type! as any,
                    coordinates: alert?.country?.countryPolygon! as any,
                  },
                });
                const [minX, minY, maxX, maxY] = mapBoundingBox;
                console.log([minX, minY, maxX, maxY]);
                mapRef.current!.fitBounds(
                  [minX, minY, maxX, maxY] as LngLatBoundsLike,
                  { padding: { top: 10, bottom: 25, left: 15, right: 5 } }
                );
              }
            );
          }
        });

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
    mapContainerRef,
  ]);

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
          <Tab value="source-tab" label="Sources" disabled={sources === null} />
        </Tabs>

        {value === "map-tab" && (
          <Box p={3}>
            {loading && alertsLoading && (
              <div
                style={{ width: "100%", height: "600px", position: "relative" }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "600px", // Set the height to 600px
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#e0dcdc",
                    zIndex: 999,
                  }}
                >
                  <div>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "30px",
                        height: "60px",
                        borderRadius: "30px",
                        bgColor: "black",
                      }}
                    >
                      <Progress />
                      <Typography
                        sx={{ paddingLeft: "5px" }}
                        variant="h4"
                        fontWeight={800}
                        color="f5333f"
                      >
                        Loading Alerts
                      </Typography>
                    </Box>
                  </div>
                </div>
              </div>
            )}

            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <div
                ref={mapContainerRef}
                className="map-container"
                style={{
                  width: isPolygonClicked ? "35%" : "100%",
                }}
              ></div>
              {isPolygonClicked && (
                <Box
                  sx={{
                    width: "65%",
                    height: "600px",
                    backgroundColor: "lightgray",
                    position: "relative",
                    transform: `translateX(${
                      isPolygonClicked ? "0%" : "100%"
                    })`,
                    transition: "transform 0.3s ease-in-out",
                  }}
                >
                  <PopupComponent
                    handleClose={handleClose}
                    alerts={countryTables.current[tableID].alerts}
                  />
                </Box>
              )}
            </Box>
          </Box>
        )}

        {value === "source-tab" && (
          <Box p={3}>
            <SourcesTableComponent sources={sources}></SourcesTableComponent>
          </Box>
        )}
      </Box>
    </>
  );
};

export default MapComponent;
