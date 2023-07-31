import React, { useEffect, useRef, useState } from "react";
import mapboxgl, { LngLatBoundsLike } from "mapbox-gl";
import { Container, Box } from "@mui/material";
import turfBbox from "@turf/bbox";
import { PopupComponent } from "./PopupComponent/PopupComponent_new";

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
        setPolygonClicked(false);
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
          mapRef.current!.resize();
          const mapBoundingBox = turfBbox({
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: [polygonCoordinates],
            },
          });

          const [minX, minY, maxX, maxY] = mapBoundingBox;
          console.log([minX, minY, maxX, maxY]);
          mapRef.current!.fitBounds(
            [minX, minY, maxX, maxY] as LngLatBoundsLike,
            { padding: { top: 10, bottom: 25, left: 15, right: 5 } }
          );
        }
      );
    });
  }, []);

  const handleClose = () => {
    setPolygonClicked(false);
    mapContainerRef.current!.style.width = "100%";

    mapContainerRef.current!.classList.add("map-container-transition");

    setTimeout(() => {
      mapRef.current!.resize();
      mapRef.current?.setCenter([0, 0]);
      mapRef.current?.setZoom(1);

      mapContainerRef.current!.classList.remove("map-container-transition");
    }, 300);
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ paddingTop: "30px", display: "flex" }}>
        <div
          ref={mapContainerRef}
          id="map"
          className="map-container"
          style={{ width: isPolygonClicked ? "35%" : "100%" }}
        />
        {isPolygonClicked && (
          <Box
            sx={{
              width: "65%",
              height: "600px",
              backgroundColor: "lightgray",
              position: "relative",
              transform: `translateX(${isPolygonClicked ? "0%" : "100%"})`,
              transition: "transform 0.3s ease-in-out",
            }}
          >
            {/* <IconButton
              sx={{ position: "absolute", top: "10px", right: "10px" }}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton> */}
            <PopupComponent
              handleClose={handleClose}
              alerts={[
                {
                  addresses: "",
                  code: "",
                  identifier: "2.49.0.1.643.0.2023.7.30.11.46.1.47.EN",
                  id: "178054",
                  incidents: "",
                  msgType: "UPDATE",
                  note: "",
                  references:
                    "web@mecom.ru,2.49.0.1.643.0.2023.7.30.10.46.2.45.EN,2023-07-30T10:46:02-00:00",
                  restriction: "",
                  scope: "PUBLIC",
                  sender: "web@mecom.ru",
                  sent: "2023-07-30T11:46:01+00:00",
                  source: "",
                  status: "ACTUAL",
                  url: "https://meteoinfo.ru/hmc-output/cap/cap-feed/en/20230730114601-47.xml",
                  alertinfoSet: [
                    {
                      audience: "",
                      category: "MET",
                      certainty: "LIKELY",
                      contact: "",
                      description: "",
                      effective: "2023-07-30T11:46:01+00:00",
                      event: "Rain",
                      eventCode: "",
                      expires: "2023-07-31T03:00:00+00:00",
                      headline: "Rain",
                      id: "180894",
                      senderName: "",
                      responseType: "",
                      language: "en-US",
                      instruction: "",
                      onset: "2023-07-30T11:00:00+00:00",
                      urgency: "IMMEDIATE",
                      web: "",
                      severity: "MODERATE",
                    },
                  ],
                  country: {
                    centroid: "[96.5680544878298, 61.9494224376748]",
                    polygon: "",
                    name: "Russian Federation",
                    iso3: "RUS",
                    id: "26",
                  },
                },
                {
                  addresses: "",
                  code: "",
                  identifier: "2.49.0.1.643.0.2023.7.30.11.46.1.48.EN",
                  id: "178055",
                  incidents: "",
                  msgType: "UPDATE",
                  note: "",
                  references:
                    "web@mecom.ru,2.49.0.1.643.0.2023.7.30.10.46.2.46.EN,2023-07-30T10:46:02-00:00",
                  restriction: "",
                  scope: "PUBLIC",
                  sender: "web@mecom.ru",
                  sent: "2023-07-30T11:46:01+00:00",
                  source: "",
                  status: "ACTUAL",
                  url: "https://meteoinfo.ru/hmc-output/cap/cap-feed/en/20230730114601-48.xml",
                  alertinfoSet: [
                    {
                      audience: "",
                      category: "MET",
                      certainty: "LIKELY",
                      contact: "",
                      description: "",
                      effective: "2023-07-30T11:46:01+00:00",
                      event: "Wind",
                      eventCode: "",
                      expires: "2023-07-31T15:00:00+00:00",
                      headline: "Wind",
                      id: "180895",
                      senderName: "",
                      responseType: "",
                      language: "en-US",
                      instruction: "",
                      onset: "2023-07-30T11:00:00+00:00",
                      urgency: "IMMEDIATE",
                      web: "",
                      severity: "MODERATE",
                    },
                  ],
                  country: {
                    centroid: "[96.5680544878298, 61.9494224376748]",
                    polygon: "",
                    name: "Russian Federation",
                    iso3: "RUS",
                    id: "26",
                  },
                },
                {
                  addresses: "",
                  code: "",
                  identifier: "2.49.0.1.643.0.2023.7.30.11.46.1.49.EN",
                  id: "178056",
                  incidents: "",
                  msgType: "UPDATE",
                  note: "",
                  references:
                    "web@mecom.ru,2.49.0.1.643.0.2023.7.30.10.46.2.47.EN,2023-07-30T10:46:02-00:00",
                  restriction: "",
                  scope: "PUBLIC",
                  sender: "web@mecom.ru",
                  sent: "2023-07-30T11:46:01+00:00",
                  source: "",
                  status: "ACTUAL",
                  url: "https://meteoinfo.ru/hmc-output/cap/cap-feed/en/20230730114601-49.xml",
                  alertinfoSet: [
                    {
                      audience: "",
                      category: "MET",
                      certainty: "LIKELY",
                      contact: "",
                      description: "",
                      effective: "2023-07-30T11:46:01+00:00",
                      event: "Thunderstorms",
                      eventCode: "",
                      expires: "2023-07-31T15:00:00+00:00",
                      headline: "Thunderstorms",
                      id: "180896",
                      senderName: "",
                      responseType: "",
                      language: "en-US",
                      instruction: "",
                      onset: "2023-07-30T11:00:00+00:00",
                      urgency: "IMMEDIATE",
                      web: "",
                      severity: "MODERATE",
                    },
                  ],
                  country: {
                    centroid: "[96.5680544878298, 61.9494224376748]",
                    polygon: "",
                    name: "Russian Federation",
                    iso3: "RUS",
                    id: "26",
                  },
                },
                {
                  addresses: "",
                  code: "",
                  identifier: "2.49.0.1.643.0.2023.7.30.11.46.1.50.EN",
                  id: "178057",
                  incidents: "",
                  msgType: "UPDATE",
                  note: "",
                  references:
                    "web@mecom.ru,2.49.0.1.643.0.2023.7.30.10.46.2.48.EN,2023-07-30T10:46:02-00:00",
                  restriction: "",
                  scope: "PUBLIC",
                  sender: "web@mecom.ru",
                  sent: "2023-07-30T11:46:01+00:00",
                  source: "",
                  status: "ACTUAL",
                  url: "https://meteoinfo.ru/hmc-output/cap/cap-feed/en/20230730114601-50.xml",
                  alertinfoSet: [
                    {
                      audience: "",
                      category: "MET",
                      certainty: "LIKELY",
                      contact: "",
                      description: "",
                      effective: "2023-07-30T11:46:01+00:00",
                      event: "Fog",
                      eventCode: "",
                      expires: "2023-07-31T03:00:00+00:00",
                      headline: "Fog",
                      id: "180897",
                      senderName: "",
                      responseType: "",
                      language: "en-US",
                      instruction: "",
                      onset: "2023-07-30T15:00:00+00:00",
                      urgency: "FUTURE",
                      web: "",
                      severity: "MODERATE",
                    },
                  ],
                  country: {
                    centroid: "[96.5680544878298, 61.9494224376748]",
                    polygon: "",
                    name: "Russian Federation",
                    iso3: "RUS",
                    id: "26",
                  },
                },
              ]}
            />
          </Box>
        )}
      </Container>
    </>
  );
};

export default TestMapComponentPopup;
