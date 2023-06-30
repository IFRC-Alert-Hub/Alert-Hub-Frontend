import React, { ReactElement, useEffect, useRef, useState } from "react";
import mapboxgl, { Map as MapboxMap, LngLatBoundsLike } from "mapbox-gl";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material";
import { theme } from "../../theme";
import turfBbox from "@turf/bbox";
import { PopupComponent } from "./PopupComponent";
// import { MapData } from "./MapData";
import { EuropeData } from "./EuropeData";
// import { MapData } from "./MapData";
export const ExtremeThreatColour: string = "#f5333f";
export const ModerateThreatColour: string = "#ff9e00";
export const OtherAlertsColour: string = "#95BF6E";

const getPolygonCenter = (coordinates: number[][]): [number, number] => {
  const centroid: [number, number] = coordinates.reduce(
    (sum: [number, number], current: number[]) => {
      sum[0] += current[0];
      sum[1] += current[1];
      return sum;
    },
    [0, 0]
  );
  centroid[0] /= coordinates.length;
  centroid[1] /= coordinates.length;

  return centroid;
};

type Pin = {
  coordinates: number[];
  color: string;
};
type Bbox = {
  type: string;
  coordinates: number[][][];
};
type MapProps = {
  lng?: number;
  lat?: number;
  zoom?: number;
  mapContainerRef: React.RefObject<HTMLDivElement>;
  mapRef: React.MutableRefObject<MapboxMap | null>;
  polygons?: Polygon[];
  pins?: Pin[];
  boundingRegionCoordinates?: Bbox;
  alerts?: AlertData[];
};
type GeometryType = "Polygon" | "MultiPolygon";

type Polygon = {
  coordinates: number[][];
  color: string;
};
type Region = {
  centroid: string;
  id: string;
  name: string;
  polygon: string;
};
type CountryType = {
  centroid: string;
  id: string;
  iso: string;
  iso3: string;
  name: string;
  polygon: string;
  region: Region[];
};
type AlertData = {
  areaDesc: string;
  certainty: string;
  country: CountryType[];
  effective: string;
  event: string;
  expires: string;
  geocodeName: string;
  geocodeValue: string;
  id: string;
  identifier: string;
  msgType: string;
  scope: string;
  sender: string;
  sent: string;
  severity: string;
  status: string;
  urgency: string;
};

export interface Alert {
  region: string;
  country: string;
  event: string;
  severity: string;
  urgency: string;
  certainty: string;
  sender: string;
  effective: string;
  expires: string;
  areaDesc: string;
  countryPolygon: number[][];
  countryName: string;
  countryCentroid: number[][];
  countryISO3: string;
  type: string;
}

const MapComponent: React.FC<MapProps> = ({
  lng = 0,
  lat = 0,
  zoom = 1,
  mapContainerRef,
  mapRef,
  polygons = [],
  pins = [],
  boundingRegionCoordinates = {},
  alerts = [],
}) => {
  const [polygonDataLoaded, setPolygonDataLoaded] = useState(false);
  const [pinDataLoaded, setPinDataLoaded] = useState(false);
  const [alertsLoaded, setAlertsLoaded] = useState(false);
  const countryTables = useRef<{
    [key: string]: { table: ReactElement; alerts: Alert[] };
  }>({});

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current!,
        style: "mapbox://styles/go-ifrc/cki7aznup3hqz19rxliv3naf4",
        center: [lng, lat],
        zoom: zoom,
        scrollZoom: false, // Disable scroll zooming
        dragPan: true, // Disable drag panning
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
  }, [lat, lng, mapRef, mapContainerRef, zoom]);

  useEffect(() => {
    if (
      !mapRef.current ||
      Object.keys(boundingRegionCoordinates).length === 0
    ) {
      return;
    }
    const mapBoundingBox = turfBbox(boundingRegionCoordinates);
    const [minX, minY, maxX, maxY] = mapBoundingBox;

    mapRef.current!.fitBounds([minX, minY, maxX, maxY] as LngLatBoundsLike, {
      padding: { top: 10, bottom: 25, left: 15, right: 5 },
    });
  });

  useEffect(() => {
    if (!mapRef.current || polygonDataLoaded || polygons.length === 0) {
      return;
    }

    mapRef.current.on("load", () => {
      const popup = new mapboxgl.Popup({
        closeButton: true,
        closeOnClick: true,
      });
      polygons.forEach((polygon, index) => {
        if (polygon.coordinates && polygon.coordinates.length > 0) {
          const sourceId = `polygon-source-${index}`;
          const layerId = `polygon-layer-${index}`;

          mapRef.current?.addSource(sourceId, {
            type: "geojson",
            data: {
              type: "Feature",
              geometry: {
                type: "Polygon",
                coordinates: [polygon.coordinates],
              },
              properties: {},
            },
          });

          mapRef.current?.addLayer({
            id: layerId,
            type: "fill",
            source: sourceId,
            paint: {
              "fill-color": polygon.color,
              "fill-opacity": 0.8,
            },
          });
          mapRef.current?.on(
            "click",
            layerId,
            (e: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
              const coordinates = getPolygonCenter(
                e.features[0].geometry.coordinates[0]
              );
              const popupNode = document.createElement("div");

              const popupComponent = (
                <ThemeProvider theme={theme}>
                  <PopupComponent alerts={[]} />
                </ThemeProvider>
              );

              createRoot(popupNode).render(popupComponent);

              popup
                .setLngLat(coordinates)
                .setDOMContent(popupNode)
                .addTo(mapRef.current!);
            }
          );
        }
      });

      setPolygonDataLoaded(true);
    });
  }, [polygonDataLoaded, polygons, mapRef]);

  useEffect(() => {
    if (!mapRef.current || pinDataLoaded) {
      return;
    }

    mapRef.current.on("load", () => {
      const popup = new mapboxgl.Popup({
        closeButton: true,
        closeOnClick: true,
      });
      pins.forEach((pin, index) => {
        const sourceId = `pin-source-${index}`;

        mapRef.current?.addSource(sourceId, {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: pin.coordinates,
            },
            properties: {},
          },
        });

        mapRef.current?.addLayer({
          id: `inner_circle-${index}`,
          type: "circle",
          source: sourceId,
          paint: {
            "circle-radius": 7,
            "circle-color": pin.color,
          },
        });
        mapRef.current?.addLayer({
          id: `outer_circle-${index}`,
          type: "circle",
          source: sourceId,
          paint: {
            "circle-radius": 13,
            "circle-color": pin.color,
            "circle-opacity": 0.4,
          },
        });
        mapRef.current?.on(
          "click",
          `inner_circle-${index}`,
          (e: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
            const coordinates = e.features[0].geometry.coordinates;
            const popupNode = document.createElement("div");

            // const reverseGeocode = async () => {
            //   const response = await fetch(
            //     `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates[0]},${coordinates[1]}.json?types=country&access_token=${mapboxgl.accessToken}`
            //   );
            //   const data = await response.json();

            //   if (data.features.length > 0) {
            //     console.log("Country: ", data.features[0].text);
            //   }
            // };

            // reverseGeocode();

            const popupComponent = (
              <ThemeProvider theme={theme}>
                <PopupComponent alerts={[]} />
              </ThemeProvider>
            );

            createRoot(popupNode).render(popupComponent);

            popup
              .setLngLat(coordinates)
              .setDOMContent(popupNode)
              .addTo(mapRef.current!);
          }
        );
      });

      setPinDataLoaded(true);
    });
  }, [pinDataLoaded, pins, mapRef]);

  // const convertCoordinates = (coordinatesString: string): number[][] => {
  //   const trimmedString = coordinatesString.trim();
  //   return trimmedString.split(" ").map((coordinates) => {
  //     const [latitude, longitude] = coordinates.split(",").map(parseFloat);
  //     return [latitude, longitude];
  //   });
  // };

  const determineColour = (currentColour: string, alert: Alert) => {
    if (currentColour === ExtremeThreatColour) {
      return currentColour;
    } else {
      if (
        alert.urgency === "Immediate" ||
        alert.urgency === "Expected" ||
        alert.severity === "Extreme" ||
        alert.severity === "Severe" ||
        alert.certainty === "Observed" ||
        alert.certainty === "Likely"
      ) {
        return ExtremeThreatColour;
      }
    }
    return currentColour;
  };

  useEffect(() => {
    console.log("NEW: ", countryTables);
  }, [countryTables]);
  useEffect(() => {
    if (!mapRef.current || alertsLoaded || alerts.length === 0) {
      return;
    }

    mapRef.current?.on("load", () => {
      //alerts? or MapData
      const filteredAlert = alerts?.map((alert: any) => ({
        region: alert.country?.region?.name,
        country: alert.country?.name,
        event: alert.event,
        severity: alert.severity,
        urgency: alert.urgency,
        certainty: alert.certainty,
        sender: alert.sender,
        effective: alert.effective!,
        expires: alert.expires,
        countryPolygon:
          alert.country.multipolygon === ""
            ? JSON.parse(alert.country.polygon)
            : JSON.parse(alert.country.multipolygon),
        type: alert.country.multipolygon === "" ? "Polygon" : "MultiPolygon",
        countryName: alert.country.name,
        countryISO3: alert.country.iso3,
        countryCentroid: alert.country.centroid,
        areaDesc: alert.areaDesc,
      }));

      filteredAlert.forEach((alert) => {
        const tableId = `alertTable-${alert.countryISO3}`;
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
          mapRef.current?.getSource(`polygon-source-${alert.countryISO3}`) !==
          undefined
          // || alert.countryISO3 === "FRA"
        ) {
          mapRef.current?.setPaintProperty(
            `polygon-layer-${alert.countryISO3}`,
            "fill-color",
            determineColour(
              mapRef.current.getPaintProperty(
                `polygon-layer-${alert.countryISO3}`,
                "fill-color"
              ),
              alert
            )
          );
        } else {
          const sourceId = `polygon-source-${alert.countryISO3}`;
          const layerId = `polygon-layer-${alert.countryISO3}`;

          mapRef.current?.addSource(sourceId, {
            type: "geojson",

            data: {
              type: "Feature",
              geometry: {
                type: alert.type as GeometryType,
                coordinates: alert.countryPolygon,
              },
              properties: {},
            },
          });

          const colour = determineColour(ModerateThreatColour, alert);

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
              "fill-color": colour,
              "fill-opacity": 0.8,
            },
          });

          mapRef.current?.on(
            "click",
            layerId,
            (e: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
              // const coordinates = getPolygonCenter(
              //   e.features[0].geometry.coordinates[0]
              // );

              const coordinates: [number, number] =
                EuropeData[alert.countryISO3].centroid;
              const popupNode = document.createElement("div");
              const popupComponent = (
                <ThemeProvider theme={theme}>
                  <PopupComponent
                    alerts={countryTables.current[tableId].alerts}
                  />
                </ThemeProvider>
              );

              createRoot(popupNode).render(popupComponent);
              let popup = new mapboxgl.Popup({
                closeButton: true,
                closeOnClick: true,
              });

              popup
                .setLngLat(coordinates)
                .setDOMContent(popupNode)
                .addTo(mapRef.current!);
            }
          );
        }
      });
      setAlertsLoaded(true);
    });
  }, [alertsLoaded, alerts, mapRef, countryTables]);

  return <div ref={mapContainerRef} className="map-container" />;
};

export default MapComponent;
