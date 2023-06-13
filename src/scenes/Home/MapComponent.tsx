import React, { useEffect, MutableRefObject } from "react";
import mapboxgl, { Map as MapboxMap } from "mapbox-gl";

type MapProps = {
  lng?: number;
  lat?: number;
  zoom?: number;
  mapContainerRef: MutableRefObject<HTMLDivElement | null>;
  mapRef: MutableRefObject<MapboxMap | null>;
};

const MapComponent: React.FC<MapProps> = ({
  lng = 0,
  lat = 0,
  zoom = 1,
  mapContainerRef,
  mapRef,
}) => {
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
  }, [lng, lat, zoom, mapContainerRef, mapRef]);

  return <div ref={mapContainerRef} className="map-container" />;
};

export default MapComponent;
