/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactElement, useEffect, useRef, useState } from "react";
import mapboxgl, {
  LngLatBoundsLike,
  LngLatLike,
  Map as MapboxMap,
} from "mapbox-gl";
import {
  Alert,
  Box,
  Chip,
  CircularProgress,
  Container,
  IconButton,
  Skeleton,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { PopupComponent } from "./PopupComponent/PopupComponent";
import Progress from "../Layout/Progress";
import turfBbox from "@turf/bbox";
import {
  Bbox,
  Country,
  CountryRegionData,
  Country_Admin1s_Data,
} from "../../APIs/Alert-Manager-API/types";
import { useLevel2Data } from "../../APIs/Alert-Manager-API/Level2";
import { useLevel3Data } from "../../APIs/Alert-Manager-API/Level3";
import { useLevel4Data } from "../../APIs/Alert-Manager-API/Level4";
import { feature } from "@turf/turf";
import * as turf from "@turf/turf";

export const ExtremeThreatColour: string = "#f5333f";
export const ModerateThreatColour: string = "#ff9e00";
export const OtherAlertsColour: string = "#95BF6E";

type MapProps = {
  lng?: number;
  lat?: number;
  zoom?: number;
  mapContainerRef: React.RefObject<HTMLDivElement>;
  mapRef: React.MutableRefObject<MapboxMap | null>;
  boundingRegionCoordinates?: Bbox;
  CountryRegionData: CountryRegionData[];
  loading?: boolean;
  error?: string | null;
  handleSearch?: any;
  selectedUrgency: any;
  selectedSeverity: any;
  selectedCertainty: any;
  setCountrySelected: React.Dispatch<React.SetStateAction<boolean>>;
  countrySelected: boolean;
  isRegion: boolean;
};

const MapComponent: React.FC<MapProps> = ({
  lng = 0,
  lat = 0,
  zoom = 1,
  mapContainerRef,
  mapRef,
  CountryRegionData,
  loading,
  error,
  boundingRegionCoordinates = undefined,
  handleSearch,
  selectedUrgency,
  selectedSeverity,
  selectedCertainty,
  setCountrySelected,
  countrySelected,
  isRegion,
}) => {
  const [countryPolygonNameClicked, setCountryPolygonNameClicked] = useState<
    [string, string] | null
  >(null);

  const [countryIDs, setCountryIDs] = useState<[string, string] | null>(null);

  const [admin1Clicked, setAdmin1Clicked] = useState<boolean>(false);
  const admin1LayerIDClicked = useRef<string | null>(null);
  const [countryRegionDataLoading, setCountryRegionDataLoading] =
    useState<boolean>(true);

  const currentCountryBoundingBox = useRef<{
    countryCentroid: LngLatLike;
    zoom: number;
  } | null>(null);

  const {
    data: admin1Data,
    loading: admin1Loading,
    error: admin1Error,
    refetch: refetchAdmin1,
    setFilters: setAdmin1Filter,
  } = useLevel2Data();

  const {
    data: alertData,
    loading: alertLoading,
    error: alertError,
    refetch: refetchAlertData,
    setFilters: setAlertFilter,
  } = useLevel3Data();

  const {
    data: infoData,
    loading: infoLoading,
    error: infoError,
    refetch: refectInfoData,
  } = useLevel4Data();

  const latestRefetchAlertData = useRef<number | null>(null);
  const currentCountryPolygonData = useRef<any | null>(null);

  useEffect(() => {
    if (!mapRef.current || admin1Error || admin1Loading) return;
    // console.log("inside");
    const loadAdmin1Data = () => {
      // console.log("safafsa:", admin1Data);
      const sourceId = countryIDs![0];
      const layerId = countryIDs![1];
      const Country_ID = sourceId.match(/\d+/g)?.map(Number);
      const unknownLayerID = `${layerId}-admin1--${Country_ID}`;
      const unknownSourceID = `${sourceId}-admin1--${Country_ID}`;
      if (mapRef.current?.isStyleLoaded()) {
        if (admin1Data?.admin1s.length! > 0) {
          console.log(admin1Data?.admin1s);
          admin1Data?.admin1s.forEach((admin1, index) => {
            if (admin1.id < 0) {
              admin1.coordinates =
                currentCountryPolygonData.current.coordinates;
              admin1.type = currentCountryPolygonData.current.type;
            }
            const admin1SourceID = `${sourceId}-admin1-${admin1.id}`;
            const admin1LayerID = `${layerId}-admin1-${admin1.id}`;
            console.log("admin1: ", admin1);
            console.log("admin1SourceID: ", admin1SourceID);

            if (!mapRef.current?.getSource(admin1SourceID)) {
              console.log("Inside");
              mapRef.current?.addSource(admin1SourceID, {
                type: "geojson",
                data: {
                  type: "Feature",
                  geometry: {
                    type: admin1.type as any,
                    coordinates: admin1.coordinates as any,
                  },
                  properties: {},
                },
              });

              mapRef.current?.addLayer({
                id: `${admin1LayerID}-border`,
                type: "line",
                source: admin1SourceID,
                paint: {
                  "line-color": "#404040",
                  "line-width": 1.3,
                },
              });
              mapRef.current?.addLayer({
                id: `${admin1LayerID}`,
                type: "fill",
                source: admin1SourceID,
                paint: {
                  "fill-color": ExtremeThreatColour,
                  "fill-opacity": admin1.id < 0 ? 0.2 : 0.8,
                },
              });
              const multipolygonFeature = {
                type: "Feature",
                geometry: {
                  type: admin1.type as any,
                  coordinates: admin1.coordinates as any,
                },
              };

              const centerPoint = turf.centerOfMass(multipolygonFeature);

              const centerCoordinates = centerPoint.geometry.coordinates;

              mapRef.current?.addSource(`${admin1SourceID}-center-source`, {
                type: "geojson",
                data: {
                  type: "Feature",
                  geometry: {
                    type: "Point" as any,
                    coordinates: centerCoordinates as any,
                  },
                  properties: {},
                },
              });

              mapRef.current?.addLayer({
                id: `${admin1LayerID}-text`,
                type: "symbol",
                source: `${admin1SourceID}-center-source`,
                layout: {
                  "text-field": `${admin1.name}`,
                  "text-font": ["Open Sans Bold"],
                  "text-size": 10,
                },
                paint: {
                  "text-color": "#000000",
                },
              });

              console.log("map styles: ", mapRef.current?.getStyle());

              mapRef.current?.on(
                "click",
                admin1LayerID,
                (e: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
                  if (admin1LayerIDClicked.current !== null) {
                    mapRef.current!.setPaintProperty(
                      admin1LayerIDClicked.current,
                      "fill-color",
                      ExtremeThreatColour
                    );
                  }
                  const clickedFeatures = mapRef.current?.queryRenderedFeatures(
                    e.point
                  );
                  let layersIDsClicked = new Set();
                  let layersClicked = new Set();

                  clickedFeatures?.forEach((feature, index) => {
                    // console.log(feature.layer.id);

                    if (
                      feature.layer.id.includes(`${layerId}-admin1-`) &&
                      !feature.layer.id.includes("-text")
                    ) {
                      layersIDsClicked.add(
                        feature.layer.id.slice(`${layerId}-admin1-`.length)
                      );
                      layersClicked.add(feature.layer.id);
                    }
                  });

                  const layerIDsClickedArray = Array.from(layersIDsClicked);
                  const layersClickedArray = Array.from(layersClicked);
                  const indexToRemove =
                    layerIDsClickedArray.indexOf(Country_ID);

                  if (indexToRemove !== -1) {
                    layerIDsClickedArray.splice(indexToRemove, 1);
                    layersClickedArray.splice(indexToRemove, 1);
                  }
                  const firstValue = Number(layerIDsClickedArray[0]);

                  // console.log("FIRST VALUE: ", firstValue);
                  if (latestRefetchAlertData.current !== (firstValue as any)) {
                    latestRefetchAlertData.current = firstValue as any;
                    setAlertFilter({
                      urgency: selectedUrgency,
                      severity: selectedSeverity,
                      certainty: selectedCertainty,
                    });
                    if (typeof firstValue === "number") {
                      refetchAlertData(firstValue);
                    }
                  }
                  setAdmin1Clicked(true);

                  mapRef.current!.setPaintProperty(
                    layersClickedArray[0] as unknown as string,
                    "fill-color",
                    "orange"
                  );
                  admin1LayerIDClicked.current =
                    layersClickedArray[0] as unknown as string;

                  mapContainerRef.current!.style.width = "35%";
                  mapRef.current!.resize();
                  if (currentCountryBoundingBox.current !== null) {
                    mapRef.current!.flyTo({
                      center: currentCountryBoundingBox.current
                        ?.countryCentroid as unknown as LngLatLike,
                      zoom:
                        currentCountryBoundingBox.current!.zoom > 0
                          ? currentCountryBoundingBox.current!.zoom * 0.7
                          : mapRef.current!.getZoom(),
                    });
                  }

                  const clickedFeature = mapRef.current?.queryRenderedFeatures(
                    e.point,
                    {
                      layers: [layersClickedArray[0]] as unknown as any,
                    }
                  )[0];

                  if (clickedFeature) {
                    const featureGeometry = clickedFeature.geometry;
                    //
                    const polygonBoundingBox = turfBbox(featureGeometry);

                    const [minX, minY, maxX, maxY] = polygonBoundingBox;

                    mapRef.current?.fitBounds([minX, minY, maxX, maxY]);
                  } else {
                    console.log(e.point);
                    mapRef.current!.flyTo({
                      center: [e.lngLat.lng, e.lngLat.lat] as unknown as any,
                    });
                  }
                }
              );
            }
          });
        }
      }
    };
    if (countryIDs && admin1Data) {
      loadAdmin1Data();
    }
  }, [
    admin1Data,
    admin1Error,
    admin1Loading,
    countryIDs,
    mapContainerRef,
    mapRef,
    refetchAlertData,
    selectedCertainty,
    selectedSeverity,
    selectedUrgency,
    setAlertFilter,
  ]);

  useEffect(() => {
    setCountryRegionDataLoading(true);
    if (countrySelected) {
      countryControlChange();
      setCountrySelected(false);
    }
    if (admin1Clicked) {
      handleClose();
      setAdmin1Clicked(false);
    }

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    lat,
    lng,
    mapContainerRef,
    mapRef,
    zoom,
    CountryRegionData,
    setCountrySelected,
    isRegion,
  ]);

  useEffect(() => {
    if (
      !mapRef.current ||
      !countryRegionDataLoading ||
      CountryRegionData.length === 0
      //|| !mapRef.current.loaded()
    )
      return;
    const loadCountryRegionData = () => {
      if (isRegion) {
        const boundingRegionCoordinates = CountryRegionData[0].bbox;
        const mapBoundingBox = turfBbox(boundingRegionCoordinates);
        const [minX, minY, maxX, maxY] = mapBoundingBox;

        mapRef.current!.fitBounds(
          [minX, minY, maxX, maxY] as LngLatBoundsLike,
          {
            padding: { top: 10, bottom: 25, left: 15, right: 5 },
          }
        );
      }
      CountryRegionData.forEach((region: CountryRegionData, index: number) => {
        region.countries?.forEach((country: Country, index: number) => {
          const sourceId = `country-source-${country.id}`;

          const layerId = `country-layer-${country.id}`;
          if (!mapRef.current?.getSource(sourceId)) {
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
                "fill-color": ExtremeThreatColour,
                "fill-opacity": 0.8,
              },
            });
          }

          mapRef.current?.on(
            "click",
            layerId,
            (e: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
              setCountryPolygonNameClicked([country.name, country.iso3]);
              setCountrySelected(true);
              setCountryIDs([sourceId, layerId]);
              currentCountryPolygonData.current = {
                coordinates: country.coordinates,
                type: country.type,
              };
              mapRef.current?.resize();

              const polygonBoundingBox = turfBbox({
                type: "Feature",
                geometry: {
                  type: country.type as any,
                  coordinates: country?.coordinates as any,
                },
              });

              const [minX, minY, maxX, maxY] = polygonBoundingBox;
              const mapBoundingBox = mapRef.current!.getBounds();
              mapRef.current?.setCenter([0, 0]);
              mapRef.current?.setZoom(1);

              const polygonWidth = maxX - minX;
              const polygonHeight = maxY - minY;
              const mapWidth =
                mapBoundingBox.getEast() - mapBoundingBox.getWest();
              const mapHeight =
                mapBoundingBox.getNorth() - mapBoundingBox.getSouth();
              const zoomLevelWidth = Math.log2(mapWidth / polygonWidth);
              const zoomLevelHeight = Math.log2(mapHeight / polygonHeight);
              const zoomLevel = Math.max(zoomLevelWidth, zoomLevelHeight);
              currentCountryBoundingBox.current = {
                countryCentroid: country.centroid as unknown as LngLatLike,
                zoom: zoomLevel,
              };

              mapRef.current!.flyTo({
                center: country.centroid as unknown as LngLatLike,
                zoom:
                  zoomLevel > 0 ? zoomLevel * 0.85 : mapRef.current!.getZoom(),
              });

              mapRef.current?.setLayoutProperty(layerId, "visibility", "none");

              CountryRegionData.forEach(
                (region: CountryRegionData, index: number) => {
                  region.countries?.forEach(
                    (otherCountry: Country, index: number) => {
                      if (otherCountry.id !== country.id) {
                        mapRef.current?.setLayoutProperty(
                          `country-layer-${otherCountry.id}`,
                          "visibility",
                          "none"
                        );

                        mapRef.current?.setLayoutProperty(
                          `country-layer-${otherCountry.id}-border`,
                          "visibility",
                          "none"
                        );
                      }
                    }
                  );
                }
              );
              setAdmin1Filter({
                urgency: selectedUrgency,
                severity: selectedSeverity,
                certainty: selectedCertainty,
              });
              refetchAdmin1(country.id);
              console.log("Made Request for", country.id);
            }
          );
        });
      });
      setCountryRegionDataLoading(false);
    };
    if (!loading && !error) {
      if (mapRef.current.loaded()) {
        loadCountryRegionData();
      } else {
        mapRef.current.on("load", () => {
          loadCountryRegionData();
        });
      }
    }
  }, [
    CountryRegionData,
    error,
    loading,
    mapRef,
    countryRegionDataLoading,
    refetchAdmin1,
    admin1Data,
    admin1Loading,
    admin1Error,
    countryIDs,
    setAdmin1Filter,
    selectedUrgency,
    selectedSeverity,
    selectedCertainty,
    setCountrySelected,
    isRegion,
  ]);
  const countryControlChange = () => {
    currentCountryBoundingBox.current = null;
    const sourceID = "infoArea-source";
    const layerID = "infoArea-layer";
    if (mapRef.current?.getSource(sourceID)) {
      mapRef.current?.removeLayer(layerID);
      mapRef.current?.removeSource(sourceID);
    }
    handleClose();

    setCountrySelected(false);
    CountryRegionData.forEach((region: CountryRegionData, index: number) => {
      region.countries?.forEach((country: Country, index: number) => {
        const layerId = `country-layer-${country.id}`;
        const sourceId = `country-source-${country.id}`;
        const borderLayerId = `${layerId}-border`;
        mapRef.current?.setLayoutProperty(layerId, "visibility", "visible");
        mapRef.current?.setLayoutProperty(
          borderLayerId,
          "visibility",
          "visible"
        );
      });
    });

    const sourceId = countryIDs![0];
    const layerId = countryIDs![1];
    // console.log(mapRef.current?.getStyle().layers);
    admin1Data?.admin1s.forEach((admin1, index) => {
      const admin1LayerId = `${layerId}-admin1-${admin1.id}`;
      const admin1SourceId = `${sourceId}-admin1-${admin1.id}`;
      const admin1CenterSourceID = `${sourceId}-admin1-${admin1.id}-center-source`;

      const admin1BorderLayerId = `${admin1LayerId}-border`;
      const admin1TextLayerId = `${admin1LayerId}-text`;
      mapRef.current?.getLayer(admin1BorderLayerId) &&
        mapRef.current?.removeLayer(admin1BorderLayerId);
      mapRef.current?.getLayer(admin1TextLayerId) &&
        mapRef.current?.removeLayer(admin1TextLayerId);
      mapRef.current?.getLayer(admin1LayerId) &&
        mapRef.current?.removeLayer(admin1LayerId);
      mapRef.current?.getSource(admin1SourceId) &&
        mapRef.current?.removeSource(admin1SourceId);

      mapRef.current?.getSource(admin1CenterSourceID) &&
        mapRef.current?.removeSource(admin1CenterSourceID);
    });

    // console.log(mapRef.current?.getStyle().layers);

    mapRef.current?.setCenter([0, 0]);
    mapRef.current?.setZoom(1);
    // console.log(mapRef.current?.getStyle().layers);
    setCountryIDs(null);
  };

  const handleClose = () => {
    const sourceID = "infoArea-source";
    const layerID = "infoArea-layer";
    if (mapRef.current?.getSource(sourceID)) {
      mapRef.current?.removeLayer(layerID);
      mapRef.current?.removeSource(sourceID);
    }

    if (admin1LayerIDClicked.current !== null) {
      if (mapRef.current?.getLayer(admin1LayerIDClicked.current)) {
        mapRef.current!.setPaintProperty(
          admin1LayerIDClicked.current,
          "fill-color",
          ExtremeThreatColour
        );
      }
    }
    admin1LayerIDClicked.current = null;
    setAdmin1Clicked(false);
    mapContainerRef.current!.style.width = "100%";
    const mapContainer = document.getElementById("mapContainer");

    mapContainer?.classList.add("map-container-transition");
    mapContainerRef.current!.classList.add("map-container-transition");

    setTimeout(() => {
      mapRef.current!.resize();
      mapContainer?.classList.remove("map-container-transition");
      mapContainerRef.current!.classList.remove("map-container-transition");
      if (currentCountryBoundingBox.current !== null) {
        mapRef.current!.flyTo({
          center: currentCountryBoundingBox?.current!
            .countryCentroid as unknown as LngLatLike,
          zoom:
            currentCountryBoundingBox!.current!.zoom > 0
              ? currentCountryBoundingBox!.current!.zoom * 0.85
              : mapRef.current!.getZoom(),
        });
      }
    }, 300);
  };

  return (
    <>
      <>
        {error && (
          <Alert severity="error">
            We are currently unable to retrieve the region data, please refresh
            or try again
          </Alert>
        )}
        {admin1Error && (
          <Alert severity="error">
            We are currently unable to retrieve the admin1 data for this
            particular country, please refresh or try again
          </Alert>
        )}
        <>
          <Box sx={{ height: "40px" }}>
            {countrySelected &&
              countryPolygonNameClicked &&
              countryPolygonNameClicked.length === 2 && (
                <>
                  <Chip
                    label={
                      <>
                        {countryPolygonNameClicked[0]} (
                        {countryPolygonNameClicked[1]})
                        {admin1Loading && (
                          <IconButton aria-label="loading" disabled>
                            <CircularProgress size={20} color="secondary" />
                          </IconButton>
                        )}
                      </>
                    }
                    variant="outlined"
                    onDelete={countryControlChange}
                    disabled={admin1Loading ? true : false}
                  />
                </>
              )}
          </Box>
          <Box style={{ position: "relative" }}>
            {loading && countryRegionDataLoading && (
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  width: "100%",
                  height: "700px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#e0dcdc",
                  zIndex: 999,
                }}
              >
                <div>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "30px",
                      height: "60px",
                      borderRadius: "30px",
                      bgColor: "black",
                    }}
                  >
                    <Skeleton
                      animation="wave"
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: "100%",
                        height: "100%",
                        transform: "translate(-50%, -50%)",
                        backgroundColor: "#e0dcdc",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "none",
                      }}
                    ></Skeleton>
                    <Progress />
                    <Typography
                      sx={{ paddingLeft: "5px", zIndex: 1000 }}
                      variant="h4"
                      fontWeight={800}
                      color="f5333f"
                    >
                      Loading Alerts
                    </Typography>
                  </Box>
                </div>
              </div>
            )}

            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <div
                ref={mapContainerRef}
                className="map-container"
                id="mapContainer"
                style={{
                  width: admin1Clicked ? "35%" : "100%",
                  zIndex: 1,
                }}
              ></div>
              {admin1Clicked && (
                <Box
                  sx={{
                    width: "65%",
                    position: "relative",
                    transform: `translateX(${admin1Clicked ? "0%" : "100%"})`,
                    transition: "transform 0.3s ease-in-out",
                    zIndex: 2,
                  }}
                >
                  <PopupComponent
                    handleClose={handleClose}
                    loading={alertLoading}
                    error={alertError}
                    data={alertData}
                    countryPolygonNameClicked={countryPolygonNameClicked}
                    mapRef={mapRef}
                    infoDataHandler={{
                      data: infoData,
                      loading: infoLoading,
                      error: infoError,
                      refetch: refectInfoData,
                    }}
                    currentCountryBoundingBox={currentCountryBoundingBox}
                  />
                </Box>
              )}
            </Box>
          </Box>
        </>
      </>
    </>
  );
};

export default MapComponent;
