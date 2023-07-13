import React, { ReactElement, useEffect, useRef, useState } from "react";
import mapboxgl, { Map as MapboxMap } from "mapbox-gl";
import { Dialog } from "@mui/material";
import { PopupComponent } from "./PopupComponent";
import { Position } from "@turf/turf";

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
};
type GeometryType = "Polygon" | "MultiPolygon";

type Region = {
  centroid: string;
  id: string;
  name: string;
  polygon: string;
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
};

const MapComponent: React.FC<MapProps> = ({
  lng = 0,
  lat = 0,
  zoom = 1,
  mapContainerRef,
  mapRef,
  alerts = [],
  countries = [],
}) => {
  const [alertsLoaded, setAlertsLoaded] = useState(false);
  const [dialogLoaded, setDialogLoaded] = useState(false);
  const [tableID, setTableID] = useState<string>("");

  const countryTables = useRef<{
    [key: string]: { table: ReactElement; alerts: AlertData[] };
  }>({});

  useEffect(() => {
    setAlertsLoaded(false);

    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

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

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [lat, lng, mapRef, mapContainerRef, zoom, alerts]);

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

  useEffect(() => {
    console.log("NEW: ", countryTables);
  }, [countryTables]);

  useEffect(() => {
    console.log("Alerts Loaded: ", alerts);
  }, [alerts]);

  useEffect(() => {
    console.log("Countries Loaded: ", countries);
  }, [countries]);

  useEffect(() => {
    if (!mapRef.current || alertsLoaded || alerts.length === 0) {
      return;
    }

    mapRef.current?.on("load", () => {
      const filteredAlerts = alerts.map((alert: any) => {
        const newCountry = countries.find(
          (country) => country?.id === alert?.country?.id
        );

        const countryPolygon =
          newCountry?.multipolygon === ""
            ? JSON.parse(newCountry?.polygon || "[]")
            : JSON.parse(newCountry?.multipolygon || "[]");

        const type =
          alert?.country?.multipolygon === "" ? "Polygon" : "MultiPolygon";

        const updatedCountry = {
          ...newCountry,
          countryPolygon,
          type,
        };

        return { ...alert, country: updatedCountry };
      });

      filteredAlerts.forEach((alert: AlertData) => {
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
          // || alert.countryISO3 === "FRA"
        ) {
          mapRef.current?.setPaintProperty(
            `polygon-layer-${alert?.country?.iso3}`,
            "fill-color",
            ExtremeThreatColour
            // determineColour(
            //   mapRef.current.getPaintProperty(
            //     `polygon-layer-${alert?.country?.iso3}`,
            //     "fill-color"
            //   ),
            //   alert
            // )
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
      setAlertsLoaded(true);
    });
  }, [alertsLoaded, alerts, mapRef, countryTables]);

  const handleCloseDialog = () => {
    setDialogLoaded(false);
  };

  return (
    <>
      <div ref={mapContainerRef} className="map-container"></div>
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
