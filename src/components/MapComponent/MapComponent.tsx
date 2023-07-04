import React, { ReactElement, useEffect, useRef, useState } from "react";
import mapboxgl, { Map as MapboxMap } from "mapbox-gl";
import { Dialog } from "@mui/material";
import { PopupComponent } from "./PopupComponent";

export const ExtremeThreatColour: string = "#f5333f";
export const ModerateThreatColour: string = "#ff9e00";
export const OtherAlertsColour: string = "#95BF6E";

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
  countryCentroid: number[];
  countryISO3: string;
  type: string;
  color: string;
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
  const [alertsLoaded, setAlertsLoaded] = useState(false);
  const [dialogLoaded, setDialogLoaded] = useState(false);
  const [tableID, setTableID] = useState<string>("");

  const countryTables = useRef<{
    [key: string]: { table: ReactElement; alerts: Alert[] };
  }>({});

  useEffect(() => {
    // Reinitialize the map whenever there is a change in dependencies
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
    console.log("Alerts Loaded: ", alerts);
  }, [alerts]);

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
        countryCentroid: JSON.parse(alert.country.centroid),
        areaDesc: alert.areaDesc,
        color: determineColour(ModerateThreatColour, alert),
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
