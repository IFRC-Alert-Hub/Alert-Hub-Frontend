import React, { useRef, useEffect, useState } from "react";
import mapboxgl, { Map as MapboxMap } from "mapbox-gl";

type MapProps = {
  lng?: number;
  lat?: number;
  zoom: number;
};

type MapRef = {
  current: MapboxMap | null;
};

const Map: React.FC<MapProps> = ({ lng = 0, lat = 0, zoom = 1 }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map: MapRef = useRef<MapboxMap | null>(null);

  useEffect(() => {
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current!,
        style: "mapbox://styles/go-ifrc/cki7aznup3hqz19rxliv3naf4",
        center: [lng, lat],
        zoom: zoom,
      });

      map.current.addControl(new mapboxgl.FullscreenControl(), "top-left");
      map.current.addControl(new mapboxgl.NavigationControl(), "top-left");
    }
  }, [lng, lat, zoom]);

  return <div ref={mapContainer} className="map-container" />;
};

export default Map;
