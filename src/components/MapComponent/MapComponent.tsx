/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactElement, useEffect, useRef, useState } from "react";
import mapboxgl, {
  LngLatBoundsLike,
  LngLatLike,
  Map as MapboxMap,
} from "mapbox-gl";
import {
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
import SourcesTableComponent from "../SourceTableComponent/SourceTableComponent";
import { PopupComponent } from "./PopupComponent/PopupComponent_new";
import Progress from "../Layout/Progress";
import turfBbox from "@turf/bbox";
import {
  Bbox,
  Country,
  CountryRegionData,
  Country_Admin1s_Data,
} from "../../Alert-Manager-API/types";
import { useLevel2Data } from "../../Alert-Manager-API/Level2";

export const ExtremeThreatColour: string = "#f5333f";
export const ModerateThreatColour: string = "#ff9e00";
export const OtherAlertsColour: string = "#95BF6E";
type Region = {
  centroid: string;
  id: string;
  name: string;
  polygon: string;
};

export type SourceFeed = {
  url?: string;
  id?: string;
};
type CountryType = {
  centroid?: string;
  id?: string;
  iso3?: string;
  name?: string;
  polygon?: string;
  multipolygon?: string;
  region?: Region[];
  type?: string;
  countryPolygon?: number[][];
};

export type AlertInfoSet = {
  web?: string;
  urgency?: string;
  audience?: string;
  category?: string;
  certainty?: string;
  contact?: string;
  effective?: string;
  event?: string;
  eventCode?: string;
  headline?: string;
  expires?: string;
  instruction?: string;
  language?: string;
  onset?: string;
  responseType?: string;
  senderName?: string;
  severity?: string;
  id?: string;
  description?: string;
};
export type AlertData = {
  status?: string;
  source?: string;
  sent?: string;
  sender?: string;
  references?: string;
  scope?: string;
  restriction?: string;
  note?: string;
  msgType?: string;
  incidents?: string;
  identifier?: string;
  code?: string;
  addresses?: string;
  id?: string;
  url?: string;
  country?: CountryType;
  alertinfoSet?: AlertInfoSet[];
  feed?: SourceFeed;
};
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
}) => {
  const [countryPolygonNameClicked, setCountryPolygonNameClicked] = useState<
    [string, string, number] | null
  >(null);

  const [countryIDs, setCountryIDs] = useState<[string, string] | null>(null);
  const [countrySelected, setCountrySelected] = useState<boolean>(false);
  const [countryRegionDataLoading, setCountryRegionDataLoading] =
    useState<boolean>(true);

  const {
    data: admin1Data,
    loading: admin1Loading,
    error: admin1Error,
    refetch: refetchAdmin1,
  } = useLevel2Data();

  useEffect(() => {
    if (!admin1Error && !admin1Loading && countryIDs) {
      const sourceId = countryIDs![0];
      const layerId = countryIDs![1];

      admin1Data?.admin1s.forEach((admin1, index) => {
        const districtSourceID = `${sourceId}-district-${admin1.id}`;
        const districtLayerID = `${layerId}-district-${admin1.id}`;
        if (!mapRef.current?.getSource(districtSourceID)) {
          mapRef.current?.addSource(districtSourceID, {
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
  }, [admin1Error, admin1Loading, admin1Data, countryIDs, mapRef]);

  useEffect(() => {
    setCountryRegionDataLoading(true);
    setCountrySelected(false);

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
  }, [lat, lng, mapContainerRef, mapRef, zoom]);

  useEffect(() => {
    if (
      !mapRef.current ||
      !countryRegionDataLoading ||
      CountryRegionData.length === 0 ||
      !mapRef.current?.loaded()
    )
      return;
    if (!loading && !error) {
      CountryRegionData.forEach((region: CountryRegionData, index: number) => {
        region.countries?.forEach((country: Country, index: number) => {
          const sourceId = `country-source-${country.id}`;

          const layerId = `country-layer-${country.id}`;
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

          mapRef.current?.on(
            "click",
            layerId,
            (e: mapboxgl.MapMouseEvent & mapboxgl.EventData) => {
              setCountryPolygonNameClicked([
                country.name,
                country.iso3,
                country.id,
              ]);
              setCountrySelected(true);
              setCountryIDs([sourceId, layerId]);
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

              mapRef.current!.flyTo({
                center: country.centroid as unknown as LngLatLike,
                zoom:
                  zoomLevel > 0 ? zoomLevel * 0.75 : mapRef.current!.getZoom(),
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

              refetchAdmin1(country.id);
            }
          );
        });
      });
      setCountryRegionDataLoading(false);
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
  ]);
  const countryControlChange = () => {
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

    admin1Data?.admin1s.forEach((admin1, index) => {
      const districtLayerId = `${layerId}-district-${admin1.id}`;
      const districtSourceId = `${sourceId}-district-${admin1.id}`;
      const districtBorderLayerId = `${districtLayerId}-border`;
      const districtTextLayerId = `${districtLayerId}-text`;
      mapRef.current?.getLayer(districtBorderLayerId) &&
        mapRef.current?.removeLayer(districtBorderLayerId);
      mapRef.current?.getLayer(districtTextLayerId) &&
        mapRef.current?.removeLayer(districtTextLayerId);
      mapRef.current?.getLayer(districtLayerId) &&
        mapRef.current?.removeLayer(districtLayerId);
      mapRef.current?.getSource(districtSourceId) &&
        mapRef.current?.removeSource(districtSourceId);
    });

    mapRef.current?.setCenter([0, 0]);
    mapRef.current?.setZoom(1);
    mapRef.current?.resize();
  };

  return (
    <>
      <Container maxWidth="lg">
        <Box sx={{ height: "20px", padding: "20px" }}>
          {admin1Error && <h1>Error</h1>}
          {countrySelected &&
            countryPolygonNameClicked &&
            countryPolygonNameClicked.length === 3 && (
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
        <Box sx={{ paddingTop: "30px", display: "flex" }}>
          <div
            ref={mapContainerRef}
            className="map-container"
            style={{ width: "100%" }}
          />
        </Box>
      </Container>
    </>
  );
};

export default MapComponent;
