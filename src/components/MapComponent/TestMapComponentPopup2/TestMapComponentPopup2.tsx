import React, { useEffect, useRef, useState } from "react";
import mapboxgl, { LngLatBoundsLike } from "mapbox-gl";
import { Container, Box } from "@mui/material";
import turfBbox from "@turf/bbox";
import { UK_Polygon_Coordinates } from "./UnitedKingdom";
import { districts } from "./UnitedKingdomDistricts";

const TestMapComponentPopup2 = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [isCountryPolygonClicked, setIsCountryPolygonClicked] = useState(false);

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
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    mapRef.current.on("load", () => {
      const sourceId = `polygon-source-1`;
      const layerId = `polygon-layer-1`;
      console.log(mapRef.current);
      mapRef.current?.addSource(sourceId, {
        type: "geojson",

        data: {
          type: "Feature",
          geometry: {
            type: "MultiPolygon",
            coordinates: UK_Polygon_Coordinates,
          },
          properties: {},
        },
      });

      mapRef.current?.addLayer({
        id: `${layerId}-border`,
        type: "line",
        source: sourceId,
        paint: {
          "line-color": "black",
          "line-width": 2,
        },
      });
      mapRef.current?.addLayer({
        id: `${layerId}`,
        type: "fill",
        source: sourceId,
        paint: {
          "fill-color": "#ff0000",
          "fill-opacity": 0.8,
        },
      });

      mapRef.current?.on(
        "click",
        layerId,
        (e: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
          if (!isCountryPolygonClicked) {
            // Check if the layer has not been clicked yet
            setIsCountryPolygonClicked(true); // Set the flag to true, indicating th
            mapRef.current!.resize();

            const mapBoundingBox = turfBbox({
              type: "Feature",
              geometry: {
                type: "MultiPolygon",
                coordinates: UK_Polygon_Coordinates,
              },
            });

            const [minX, minY, maxX, maxY] = mapBoundingBox;
            mapRef.current!.fitBounds(
              [minX, minY, maxX, maxY] as LngLatBoundsLike,
              { padding: { top: 10, bottom: 25, left: 15, right: 5 } }
            );

            mapRef.current?.setPaintProperty(
              `polygon-layer-1`,
              "fill-color",
              "#FFFFFF"
            );

            districts.splice(2, 3).forEach((district, index) => {
              const districtSourceID = `district-source-${index}`;
              const districtLayerID = `district-layer-${index}`;

              if (!mapRef.current?.getSource(districtSourceID)) {
                mapRef.current?.addSource(districtSourceID, {
                  type: "geojson",

                  data: {
                    type: "Feature",
                    geometry: {
                      type: district.type as any,
                      coordinates: district.coordinates as any,
                    },
                    properties: {},
                  },
                });

                mapRef.current?.addLayer({
                  id: `${districtLayerID}-border`,
                  type: "line",
                  source: districtSourceID,
                  paint: {
                    "line-color": "black",
                    "line-width": 5,
                  },
                });
                mapRef.current?.addLayer({
                  id: `${districtLayerID}`,
                  type: "fill",
                  source: districtSourceID,
                  paint: {
                    "fill-color": "#ff0000",
                    "fill-opacity": 0.4,
                  },
                });

                mapRef.current?.addLayer({
                  id: `${districtLayerID}-text`,
                  type: "symbol",
                  source: districtSourceID,
                  layout: {
                    "text-field": `${index}`, // Replace "District Name" with the actual name you want to display
                    "text-font": ["Open Sans Bold"], // Use the bold font
                    "text-size": 12,
                    "text-anchor": "center", // Center the text horizontally within the polygon
                    "text-justify": "center", // Center the text horizontally within the polygon
                    "text-offset": [0, 0], // Adjust the offset as needed to position the text vertically
                  },
                  paint: {
                    "text-color": "#000000",
                  },
                });
              }
            });
          }
        }
      );
    });
  }, [isCountryPolygonClicked]);

  return (
    <>
      <Container maxWidth="lg">
        <Box sx={{ paddingTop: "30px", display: "flex" }}>
          <div
            ref={mapContainerRef}
            id="map"
            className="map-container"
            style={{ width: "100%" }}
          />
        </Box>
      </Container>
    </>
  );
};

export default TestMapComponentPopup2;
