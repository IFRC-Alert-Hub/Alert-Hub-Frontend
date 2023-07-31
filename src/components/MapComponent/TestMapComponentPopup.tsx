import React, { useEffect, useRef, useState } from "react";
import mapboxgl, { LngLatBoundsLike } from "mapbox-gl";
import { Container, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import turfBbox from "@turf/bbox";

const TestMapComponentPopup = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [isPolygonClicked, setPolygonClicked] = useState(false);

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
    const polygonCoordinates = [
      [19.442693870989842, 5.982612998519741],
      [12.57035705892315, 12.893051800402247],
      [18.651120882975988, -2.7036592662943235],
      [27.845545631420237, 2.0510405168171246],
      [27.654217094163243, 7.265946190833631],
      [19.442693870989842, 5.982612998519741],
    ];
    mapRef.current.on("load", () => {
      const sourceId = `polygon-source-1`;
      const layerId = `polygon-layer-1`;
      console.log(mapRef.current);
      mapRef.current!.addSource(sourceId, {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [polygonCoordinates],
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
          "line-width": 1.3,
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
          setPolygonClicked(true);
          mapContainerRef.current!.style.width = "35%";

          const mapBoundingBox = turfBbox({
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: [polygonCoordinates],
            },
          });

          const [minX, minY, maxX, maxY] = mapBoundingBox;
          console.log([minX, minY, maxX, maxY]);
          mapRef.current!.fitBounds([
            minX,
            minY,
            maxX,
            maxY,
          ] as LngLatBoundsLike);
        }
      );
    });
  }, []);

  const handleClose = () => {
    setPolygonClicked(false);
    mapRef.current?.setCenter([0, 0]);
    mapRef.current?.setZoom(1);
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ paddingTop: "30px", display: "flex" }}>
        <div
          ref={mapContainerRef}
          className="map-container"
          style={{ width: isPolygonClicked ? "35%" : "100%" }}
        />
        {isPolygonClicked && (
          <Box
            style={{
              width: "65%",
              backgroundColor: "lightgray",
              position: "relative",
              transition: "width 0.3s ease-in-out",
            }}
          >
            <IconButton
              sx={{ position: "absolute", top: "10px", right: "10px" }}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
            {/* Add the content for the box here */}
            This is the box content
          </Box>
        )}
      </Container>
    </>
  );
};

export default TestMapComponentPopup;
