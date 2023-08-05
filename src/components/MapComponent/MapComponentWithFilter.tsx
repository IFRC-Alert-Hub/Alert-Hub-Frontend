import React, { useRef } from "react";
import mapboxgl from "mapbox-gl";

import TitleHeader from "../Layout/TitleHeader";
import { useIntl } from "react-intl";
import { Bbox, CountryRegionData } from "../../Alert-Manager-API/types";
import MapComponent from "./MapComponent";

interface MapComponentWithFilterProps {
  loading: boolean;
  error: string | null;
  data: CountryRegionData[];
  boundingRegionCoordinates?: Bbox;
  filterKey?: string;
  selectedFilter?: string;
}

const MapComponentWithFilter: React.FC<MapComponentWithFilterProps> = ({
  loading,
  error,
  data,
  boundingRegionCoordinates,
  filterKey,
  selectedFilter,
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  const { formatMessage } = useIntl();

  return (
    <>
      <TitleHeader
        title={`${formatMessage({ id: "ALL_ONGOING_ALERTS" })} (${200})`}
        rightTitle={`${formatMessage({ id: "VIEW_ALL_ALERTS" })}`}
        rightLinkURL={"/alerts/all"}
        selectedFilter={selectedFilter}
        filterKey={filterKey}
      />

      <MapComponent
        mapContainerRef={mapContainerRef}
        mapRef={mapRef}
        CountryRegionData={data}
        loading={loading}
        error={error}
      />
    </>
  );
};

export default MapComponentWithFilter;
