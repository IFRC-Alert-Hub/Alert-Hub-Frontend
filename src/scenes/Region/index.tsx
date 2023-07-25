import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { cap_aggregator } from "../../API/API_Links";
import MapComponentWithFilter from "../../components/MapComponent/MapComponentWithFilter";
import { ALL_ALERTS, GET_ALL_REGIONS } from "../../API/ALL_QUERIES";

export const cardData = [
  {
    title: "Flood Warning issured March 2023",
    updatedTime: "JUNE 8, 2023",
    country: "United States",
    severity: "Extreme",
    event: "Flood Warning",
    instruction:
      "When facing a flood, it is crucial to stay calm and vigilant. Seek higher ground, away from the flood's source, and avoid walking or driving through floodwaters. Follow evacuation orders promptly, disconnect electrical appliances, and store important documents and valuables in waterproof containers. Stay informed through local news and official channels, and offer assistance to those in need if it is safe to do so. Contact emergency services if immediate help is required. Prioritizing personal safety and following official instructions are key during a flood.",
  },
  {
    title: "Flood Warning issured March 2024",
    updatedTime: "JUNE 8, 2023",
    country: "United States",
    severity: "Extreme",
    event: "Flood Warning",
    instruction:
      "When facing a flood, it is crucial to stay calm and vigilant. Seek higher ground, away from the flood's source, and avoid walking or driving through floodwaters. Follow evacuation orders promptly, disconnect electrical appliances, and store important documents and valuables in waterproof containers. Stay informed through local news and official channels, and offer assistance to those in need if it is safe to do so. Contact emergency services if immediate help is required. Prioritizing personal safety and following official instructions are key during a flood.",
  },
  {
    title: "Flood Warning issured March 2025",
    updatedTime: "JUNE 8, 2023",
    country: "United States",
    severity: "Extreme",
    event: "Flood Warning",
    instruction:
      "When facing a flood, it is crucial to stay calm and vigilant. Seek higher ground, away from the flood's source, and avoid walking or driving through floodwaters. Follow evacuation orders promptly, disconnect electrical appliances, and store important documents and valuables in waterproof containers. Stay informed through local news and official channels, and offer assistance to those in need if it is safe to do so. Contact emergency services if immediate help is required. Prioritizing personal safety and following official instructions are key during a flood.",
  },
  {
    title: "Flood Warning issured March 2025",
    updatedTime: "JUNE 8, 2023",
    country: "United States",
    severity: "Extreme",
    event: "Flood Warning",
    instruction:
      "When facing a flood, it is crucial to stay calm and vigilant. Seek higher ground, away from the flood's source, and avoid walking or driving through floodwaters. Follow evacuation orders promptly, disconnect electrical appliances, and store important documents and valuables in waterproof containers. Stay informed through local news and official channels, and offer assistance to those in need if it is safe to do so. Contact emergency services if immediate help is required. Prioritizing personal safety and following official instructions are key during a flood.",
  },
  {
    title: "Flood Warning issured March 2025",
    updatedTime: "JUNE 8, 2023",
    country: "United States",
    severity: "Extreme",
    event: "Flood Warning",
    instruction:
      "When facing a flood, it is crucial to stay calm and vigilant. Seek higher ground, away from the flood's source, and avoid walking or driving through floodwaters. Follow evacuation orders promptly, disconnect electrical appliances, and store important documents and valuables in waterproof containers. Stay informed through local news and official channels, and offer assistance to those in need if it is safe to do so. Contact emergency services if immediate help is required. Prioritizing personal safety and following official instructions are key during a flood.",
  },
  {
    title: "Flood Warning issured March 2025",
    updatedTime: "JUNE 8, 2023",
    country: "United States",
    severity: "Extreme",
    event: "Flood Warning",
    instruction:
      "When facing a flood, it is crucial to stay calm and vigilant. Seek higher ground, away from the flood's source, and avoid walking or driving through floodwaters. Follow evacuation orders promptly, disconnect electrical appliances, and store important documents and valuables in waterproof containers. Stay informed through local news and official channels, and offer assistance to those in need if it is safe to do so. Contact emergency services if immediate help is required. Prioritizing personal safety and following official instructions are key during a flood.",
  },
  {
    title: "Flood Warning issured March 2025",
    updatedTime: "JUNE 8, 2023",
    country: "United States",
    severity: "Extreme",
    event: "Flood Warning",
    instruction:
      "When facing a flood, it is crucial to stay calm and vigilant. Seek higher ground, away from the flood's source, and avoid walking or driving through floodwaters. Follow evacuation orders promptly, disconnect electrical appliances, and store important documents and valuables in waterproof containers. Stay informed through local news and official channels, and offer assistance to those in need if it is safe to do so. Contact emergency services if immediate help is required. Prioritizing personal safety and following official instructions are key during a flood.",
  },
  {
    title: "Flood Warning issured March 2025",
    updatedTime: "JUNE 8, 2023",
    country: "United States",
    severity: "Extreme",
    event: "Flood Warning",
    instruction:
      "When facing a flood, it is crucial to stay calm and vigilant. Seek higher ground, away from the flood's source, and avoid walking or driving through floodwaters. Follow evacuation orders promptly, disconnect electrical appliances, and store important documents and valuables in waterproof containers. Stay informed through local news and official channels, and offer assistance to those in need if it is safe to do so. Contact emergency services if immediate help is required. Prioritizing personal safety and following official instructions are key during a flood.",
  },
  {
    title: "Flood Warning issured March 2025",
    updatedTime: "JUNE 8, 2023",
    country: "United States",
    severity: "Extreme",
    event: "Flood Warning",
    instruction:
      "When facing a flood, it is crucial to stay calm and vigilant. Seek higher ground, away from the flood's source, and avoid walking or driving through floodwaters. Follow evacuation orders promptly, disconnect electrical appliances, and store important documents and valuables in waterproof containers. Stay informed through local news and official channels, and offer assistance to those in need if it is safe to do so. Contact emergency services if immediate help is required. Prioritizing personal safety and following official instructions are key during a flood.",
  },
];

interface RegionInterface {
  centroid: string;
  id: string;
  name: string;
  polygon: string;
}
const convertCoordinates = (coordinatesString: string): number[][] => {
  const trimmedString = coordinatesString.trim();
  return trimmedString.split(" ").map((coordinates) => {
    const [latitude, longitude] = coordinates.split(",").map(parseFloat);
    return [latitude, longitude];
  });
};

const Region = () => {
  const { id } = useParams<string>();

  const {
    loading: loading_regions,
    error: error_regions,
    data: data_regions,
  } = useQuery(GET_ALL_REGIONS, {
    client: cap_aggregator,
  });
  const {
    loading: loading_alerts,
    error: error_alerts,
    data: data_alerts,
    refetch: refetch_alerts,
  } = useQuery(ALL_ALERTS, {
    variables: {
      regionId: "",
    },
    client: cap_aggregator,
  });

  const region = useMemo(() => {
    if (!loading_regions && !error_regions && data_regions) {
      const regions = data_regions.listRegion;
      let region = regions.find(
        (item: RegionInterface) => item.id.toString() === id
      );

      let updatedRegion = {
        ...region,
        centroid: JSON.parse(region.centroid),
        bbox: {
          type: "Polygon",
          coordinates: [convertCoordinates(region.polygon)],
        },
      };

      return updatedRegion;
    }
  }, [loading_regions, error_regions, data_regions, id]);

  useEffect(() => {
    console.log("Region:", region);
    if (!loading_regions && !error_regions && data_regions) {
      refetch_alerts({ regionId: region.id });
    }
  }, [loading_regions, error_regions, data_regions, region, refetch_alerts]);
  return (
    <>
      <Container maxWidth="lg">
        {loading_regions ? (
          <CircularProgress sx={{ textAlign: "center" }} color="secondary" />
        ) : error_regions ? (
          <p>Error: {error_regions.message}</p>
        ) : (
          <>
            <Box sx={{ padding: "50px 0 30px 0" }}>
              <Typography
                variant="h1"
                textAlign="center"
                fontWeight="bold"
                textTransform="capitalize"
                letterSpacing="1.6px"
              >
                {region?.name}
              </Typography>
            </Box>
            {/* <TitleHeader
              title="ONGOING Extreme Alerts"
              rightTitle="View all alerts"
              rightLinkURL="/alerts/all"
              filterKey="region"
              selectedFilter={region?.name}
            />
            <Box margin="0px 25px 25px">
              <CardCarousel cards={cardData} />
            </Box> */}

            <MapComponentWithFilter
              data={data_alerts}
              loading={loading_alerts}
              error={error_alerts}
              boundingRegionCoordinates={region?.bbox}
              filterKey="region"
              selectedFilter={region?.name}
            />
          </>
        )}
      </Container>
    </>
  );
};

export default Region;
