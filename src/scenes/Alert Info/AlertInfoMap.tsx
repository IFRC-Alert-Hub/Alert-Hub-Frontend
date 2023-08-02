import React, { useEffect, useRef, useState } from "react";
import mapboxgl, { LngLatBoundsLike } from "mapbox-gl";
import MapIcon from "@mui/icons-material/Map";
import turfBbox from "@turf/bbox";

type MapProps = {
  lng?: number;
  lat?: number;
  zoom?: number;
  areaPolygon?: Polygon;
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
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [polygonDataLoaded, setPolygonDataLoaded] = useState(false);

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
    if (!mapRef.current || polygonDataLoaded || areaPolygon === undefined) {
      return;
    }
    console.log(areaPolygon);

    mapRef.current.on("load", () => {
      const sourceId = `infoset-polygon-source`;
      const layerId = `infoset-polygon-layer`;
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

      setPolygonDataLoaded(true);

      const mapBoundingBox = turfBbox({
        type: "Feature",
        geometry: {
          type: areaPolygon.geometryType as any,
          coordinates: [areaPolygon.coordinates] as any,
        },
      });

      const [minX, minY, maxX, maxY] = mapBoundingBox;
      console.log([minX, minY, maxX, maxY]);
      mapRef.current!.fitBounds([minX, minY, maxX, maxY] as LngLatBoundsLike, {
        padding: { top: 10, bottom: 25, left: 15, right: 5 },
      });
    });
  }, [polygonDataLoaded, areaPolygon, mapRef]);

  return (
    <>
      {areaPolygon === undefined ? (
        <h1>
          <MapIcon />
          No Polygon Data
        </h1>
      ) : (
        ""
      )}

      <div ref={mapContainerRef} className="map-container" />
    </>
  );
};

export default AlertInfoMap;
