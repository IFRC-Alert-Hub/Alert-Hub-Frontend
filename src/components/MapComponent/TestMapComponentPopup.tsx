import React, { useEffect, useRef, useState } from "react";
import mapboxgl, { Map as MapboxMap } from "mapbox-gl";

const TestMapComponentPopup = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current!,
        style: "mapbox://styles/go-ifrc/cki7aznup3hqz19rxliv3naf4",
        center: [0, 0],
        zoom: 1,
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
  }, [mapRef, mapContainerRef]);

  //   useEffect(() => {
  //     if (!mapRef.current || polygonDataLoaded || polygons.length === 0) {
  //       return;
  //     }

  //     mapRef.current.on("load", () => {
  //       polygons.forEach((polygon, index) => {
  //         if (polygon.coordinates && polygon.coordinates.length > 0) {
  //           const sourceId = `polygon-source-${index}`;
  //           const layerId = `polygon-layer-${index}`;

  //           mapRef.current?.addSource(sourceId, {
  //             type: "geojson",
  //             data: {
  //               type: "Feature",
  //               geometry: {
  //                 type: "Polygon",
  //                 coordinates: [polygon.coordinates],
  //               },
  //               properties: {},
  //             },
  //           });

  //           mapRef.current?.addLayer({
  //             id: layerId,
  //             type: "fill",
  //             source: sourceId,
  //             paint: {
  //               "fill-color": polygon.color,
  //               "fill-opacity": 0.8,
  //             },
  //           });
  //         }
  //       });

  //       setPolygonDataLoaded(true);
  //     });
  //   }, [polygonDataLoaded, polygons, mapRef]);

  return <div ref={mapContainerRef} className="map-container" />;
};

export default TestMapComponentPopup;
