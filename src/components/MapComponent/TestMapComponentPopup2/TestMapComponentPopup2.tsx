import React, { useEffect, useRef, useState } from "react";
import mapboxgl, { LngLatBoundsLike } from "mapbox-gl";
import { Container, Box, Chip } from "@mui/material";
import turfBbox from "@turf/bbox";
import { Polygon_Coordinates } from "./UnitedKingdom";
import { districts } from "./UnitedKingdomDistricts";

const TestMapComponentPopup2 = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [countryPolygonClicked, setCountryPolygonClicked] =
    useState<string>("");

  const [countrySelected, setCountrySelected] = useState(false);

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
      Polygon_Coordinates.forEach((country, index) => {
        const sourceId = `country-source-${country.ISO3}`;
        console.log(sourceId);

        const layerId = `country-layer-${country.ISO3}`;
        mapRef.current?.addSource(sourceId, {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: country.type as any,
              coordinates: country.coordinates as any,
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
            "fill-color":
              countryPolygonClicked === country.ISO3 ? "#FFFFFF" : "#ff0000",
            "fill-opacity": 0.8,
          },
        });

        mapRef.current?.on(
          "click",
          layerId,
          (e: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
            setCountryPolygonClicked(country.ISO3);
            setCountrySelected(true);
            mapRef.current?.resize();

            const mapBoundingBox = turfBbox({
              type: "Feature",
              geometry: {
                type: country.type as any,
                coordinates: country.coordinates as any,
              },
            });

            const [minX, minY, maxX, maxY] = mapBoundingBox;
            mapRef.current?.fitBounds(
              [minX, minY, maxX, maxY] as LngLatBoundsLike,
              { padding: { top: 10, bottom: 25, left: 15, right: 5 } }
            );

            mapRef.current?.setLayoutProperty(layerId, "visibility", "none");

            Polygon_Coordinates.forEach((otherCountry) => {
              if (otherCountry.ISO3 !== country.ISO3) {
                mapRef.current?.setLayoutProperty(
                  `country-layer-${otherCountry.ISO3}`,
                  "visibility",
                  "none"
                );

                mapRef.current?.setLayoutProperty(
                  `country-layer-${otherCountry.ISO3}-border`,
                  "visibility",
                  "none"
                );
              }
            });

            // Add Districts
            const filteredDistrictData = districts.find(
              (data) => data.ISO3 === country.ISO3
            );
            filteredDistrictData?.districts.forEach((district, index) => {
              const districtSourceID = `${sourceId}-district-${district.district_id}`;
              const districtLayerID = `${layerId}-district-${district.district_id}`;
              console.log(mapRef.current?.getSource(districtSourceID));
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
                    "line-width": 1.3,
                  },
                });
                mapRef.current?.addLayer({
                  id: `${districtLayerID}`,
                  type: "fill",
                  source: districtSourceID,
                  paint: {
                    "fill-color": "#000000",
                    "fill-opacity": 0.8,
                  },
                });

                mapRef.current?.addLayer({
                  id: `${districtLayerID}-text`,
                  type: "symbol",
                  source: districtSourceID,
                  layout: {
                    "text-field": `${index}`,
                    "text-font": ["Open Sans Bold"],
                    "text-size": 12,
                    "text-anchor": "center",
                    "text-justify": "center",
                    "text-offset": [0, 0],
                  },
                  paint: {
                    "text-color": "#000000",
                  },
                });
              }
            });
          }
        );
      });
    });
  }, [countryPolygonClicked]);
  const countryControlChange = () => {
    setCountrySelected(false);
    Polygon_Coordinates.forEach((country) => {
      const layerId = `country-layer-${country.ISO3}`;
      const sourceId = `country-source-${country.ISO3}`;

      const borderLayerId = `${layerId}-border`;

      // Remove district layers
      const filteredDistrictData = districts.find(
        (data) => data.ISO3 === country.ISO3
      );
      filteredDistrictData?.districts.forEach((district, index) => {
        const districtLayerId = `${layerId}-district-${district.district_id}`;
        const districtSourceId = `${sourceId}-district-${district.district_id}`;
        const districtBorderLayerId = `${districtLayerId}-border`;
        const districtTextLayerId = `${districtLayerId}-text`;
        mapRef.current?.getSource(districtSourceId) &&
          mapRef.current?.removeSource(districtSourceId);
        mapRef.current?.getLayer(districtLayerId) &&
          mapRef.current?.removeLayer(districtLayerId);
        mapRef.current?.getLayer(districtBorderLayerId) &&
          mapRef.current?.removeLayer(districtBorderLayerId);
        mapRef.current?.getLayer(districtTextLayerId) &&
          mapRef.current?.removeLayer(districtTextLayerId);
      });

      mapRef.current?.setLayoutProperty(layerId, "visibility", "visible");
      mapRef.current?.setLayoutProperty(borderLayerId, "visibility", "visible");
    });

    mapRef.current?.setCenter([0, 0]);
    mapRef.current?.setZoom(1);
  };
  return (
    <>
      <Container maxWidth="lg">
        <Box sx={{ height: "20px", padding: "20px" }}>
          {" "}
          {countrySelected && (
            <Chip
              label="Country"
              variant="outlined"
              onDelete={countryControlChange}
            />
          )}
        </Box>

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
