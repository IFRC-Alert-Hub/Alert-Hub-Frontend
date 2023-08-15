import React, { useEffect, useRef } from "react";
import mapboxgl, { LngLatBoundsLike } from "mapbox-gl";
import MapIcon from "@mui/icons-material/Map";
import turfBbox from "@turf/bbox";
import turfCircle from "@turf/circle";
type MapProps = {
  lng?: number;
  lat?: number;
  zoom?: number;
  areaPolygon?: Polygon;
  areaCircle?: Circle;
};
type Circle = {
  radius?: number;
  coordinates: number[];
};

type Polygon = {
  geometryType?: string;
  coordinates: number[][];
};

const AlertInfoMap: React.FC<MapProps> = ({
  lng = 0,
  lat = 0,
  zoom = 1,
  areaPolygon = undefined,
  areaCircle = undefined,
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (mapRef.current?.getSource("infoset-polygon-source")) {
      mapRef.current?.removeLayer("infoset-polygon-layer");
      mapRef.current?.removeSource("infoset-polygon-source");
    }

    if (mapRef.current?.getSource("circle-source")) {
      mapRef.current?.removeLayer("circle-layer");
      mapRef.current?.removeSource("circle-source");
    }
    if (!mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current!,
        style: "mapbox://styles/go-ifrc/cki7aznup3hqz19rxliv3naf4",
        center: [lng, lat],
        zoom: zoom,
      });
    }
    mapRef.current!.resize();
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [lat, lng, zoom, areaCircle, areaPolygon]);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    mapRef.current.on("load", () => {
      if (areaPolygon !== undefined) {
        const sourceId = "infoset-polygon-source";
        const layerId = "infoset-polygon-layer";

        mapRef.current?.addSource(sourceId, {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: areaPolygon.geometryType as any,
              coordinates: [areaPolygon.coordinates] as any,
            },
            properties: {},
          },
        });

        mapRef.current?.addLayer({
          id: layerId,
          type: "fill",
          source: sourceId,
          paint: {
            "fill-color": "red",
            "fill-opacity": 0.5,
          },
        });

        const mapBoundingBox = turfBbox({
          type: "Feature",
          geometry: {
            type: areaPolygon.geometryType as any,
            coordinates: [areaPolygon.coordinates] as any,
          },
        });

        const [minX, minY, maxX, maxY] = mapBoundingBox;
        mapRef.current!.fitBounds(
          [minX, minY, maxX, maxY] as LngLatBoundsLike,
          {
            padding: { top: 10, bottom: 25, left: 15, right: 5 },
          }
        );
      }

      if (areaCircle !== undefined) {
        var circle = turfCircle(
          areaCircle?.coordinates as any,
          areaCircle?.radius as any,
          {
            units: "kilometers",
            // properties: { foo: "bar" },
          }
        );

        mapRef.current?.addSource("circle-source", {
          type: "geojson",
          data: circle,
        });

        mapRef.current?.addLayer({
          id: "circle-layer",
          type: "fill",
          source: "circle-source",
          paint: {
            "fill-color": "#0000FF",
            "fill-opacity": 0.8,
          },
        });

        const mapBoundingBox = turfBbox(circle);
        const [minX, minY, maxX, maxY] = mapBoundingBox;
        mapRef.current!.fitBounds(
          [minX, minY, maxX, maxY] as LngLatBoundsLike,
          {
            padding: { top: 20, bottom: 20, left: 20, right: 20 },
          }
        );
      }
    });
  }, [areaPolygon, areaCircle, mapRef]);

  return (
    <>
      {areaPolygon === undefined && areaCircle === undefined && (
        <h1>
          <MapIcon />
          No Data
        </h1>
      )}
      <div ref={mapContainerRef} style={{ height: "300px", width: "100%" }} />
    </>
  );
};

export default AlertInfoMap;
