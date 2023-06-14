import React, { useEffect, useState } from "react";
import mapboxgl, { Map as MapboxMap } from "mapbox-gl";

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
  }, []);

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
              "fill-opacity": 0.5,
            },
          });
        }
      });

      setPolygonDataLoaded(true);
    });
  }, [polygonDataLoaded, polygons]);

  useEffect(() => {
    if (!mapRef.current || pinDataLoaded) {
      return;
    }

    mapRef.current.on("load", () => {
      pins.forEach((pin, index) => {
        const sourceId = `pin-source-${index}`;
        const layerId = `pin-layer-${index}`;

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
          id: `${layerId}-blur`,
          type: "circle",
          source: sourceId,
          paint: {
            "circle-radius": 10,
            "circle-color": pin.color,
            "circle-opacity": 0.2,
            "circle-blur": 1,
          },
        });

        mapRef.current?.addLayer({
          id: layerId,
          type: "circle",
          source: sourceId,
          paint: {
            "circle-radius": 7,
            "circle-color": pin.color,
            "circle-opacity": 0.7,
          },
        });
      });

      setPinDataLoaded(true);
    });
  }, [pinDataLoaded, pins]);

  return <div ref={mapContainerRef} className="map-container" />;
};

export default MapComponent;
