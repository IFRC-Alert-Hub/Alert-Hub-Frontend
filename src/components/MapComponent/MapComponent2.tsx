import React, { useRef, useEffect } from "react";
import mapboxgl, { LngLatBoundsLike } from "mapbox-gl";
import turfBbox from "@turf/bbox";

const polygonCoordinates = {
  name: 3,
  id: 3,
  region_name: "Europe",
  bbox: {
    type: "Polygon",
    coordinates: [
      [
        [-31.826238837911355, 20.48553219475167],
        [-27.959051338449562, 70.67700773369562],
        [89.81438614515588, 71.47500691896067],
        [91.92376114486606, 20.48553219475167],
        [-31.826238837911355, 20.48553219475167],
      ],
    ],
  },
  label: "Europe",
};
const mapBoundingBox = turfBbox(polygonCoordinates.bbox);
const [minX, minY, maxX, maxY] = mapBoundingBox;

const MapComponent: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-20, -3],
      zoom: 4,
    });

    mapRef.current!.fitBounds([minX, minY, maxX, maxY] as LngLatBoundsLike, {
      padding: { top: 10, bottom: 25, left: 15, right: 5 },
    });

    return () => {
      mapRef.current?.remove();
    };
  }, []);

  return (
    <div ref={mapContainerRef} style={{ width: "100%", height: "400px" }} />
  );
};

export default MapComponent;
