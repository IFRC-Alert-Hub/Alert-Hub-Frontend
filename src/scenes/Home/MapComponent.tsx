import React, { useEffect, useState } from "react";
import mapboxgl, { Map as MapboxMap } from "mapbox-gl";
import { createRoot } from "react-dom/client";
import PopupComponent from "./PopupComponent";
import { ThemeProvider } from "@mui/material";
import { theme } from "../../theme";

type Pin = {
  coordinates: number[];
  color: string;
};

type MapProps = {
  lng?: number;
  lat?: number;
  zoom?: number;
  mapContainerRef: React.RefObject<HTMLDivElement>;
  mapRef: React.MutableRefObject<MapboxMap | null>;
  polygons?: Polygon[];
  pins?: Pin[];
};

type Polygon = {
  coordinates: number[][];
  color: string;
};

const MapComponent: React.FC<MapProps> = ({
  lng = 0,
  lat = 0,
  zoom = 1,
  mapContainerRef,
  mapRef,
  polygons = [],
  pins = [],
}) => {
  const [polygonDataLoaded, setPolygonDataLoaded] = useState(false);
  const [pinDataLoaded, setPinDataLoaded] = useState(false);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current!,
        style: "mapbox://styles/go-ifrc/cki7aznup3hqz19rxliv3naf4",
        center: [lng, lat],
        zoom: zoom,
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
    if (!mapRef.current || polygonDataLoaded || polygons.length === 0) {
      return;
    }

    mapRef.current.on("load", () => {
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
        closeButton: false,
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
            console.log("hello");
            const coordinates = e.features[0].geometry.coordinates;
            const popupNode = document.createElement("div");

            const popupComponent = (
              <ThemeProvider theme={theme}>
                <PopupComponent />
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
      console.log(mapRef.current?.getStyle().layers);
    });
  }, [pinDataLoaded, pins, mapRef]);

  return <div ref={mapContainerRef} className="map-container" />;
};

export default MapComponent;
