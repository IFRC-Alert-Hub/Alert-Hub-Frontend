import { Box, Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import TitleHeader from "../../components/TitleHeader";
import MapComponent from "../../components/MapComponent/MapComponent";
import { useRef } from "react";
import CardCarousel from "../../components/Card/CardCarousel";

const regionItems = [
  {
    name: 0,
    id: 0,
    region_name: "Africa",
    bbox: {
      type: "Polygon",
      coordinates: [
        [
          [-32.99047851563365, -47.08120743260386],
          [-32.99047851563365, 41.726381079898935],
          [67.90795898435852, 41.726381079898935],
          [67.90795898435852, -47.08120743260386],
          [-32.99047851563365, -47.08120743260386],
        ],
      ],
    },
    label: "Africa",
  },
  {
    name: 1,
    id: 1,
    region_name: "Americas",
    bbox: {
      type: "Polygon",
      coordinates: [
        [
          [-129.72656248194582, -62.378488432147485],
          [-131.72607420041345, 57.13276081967902],
          [-32.23388671426278, 56.749208410332756],
          [-29.42138671465428, -61.94196560312882],
          [-129.72656248194582, -62.378488432147485],
        ],
      ],
    },
    label: "Americas",
  },
  {
    name: 2,
    id: 2,
    region_name: "Asia Pacific",
    bbox: {
      type: "Polygon",
      coordinates: [
        [
          [179.29687497503375, 54.87660664883007],
          [179.99999997494376, -60.84491056841565],
          [54.492187492411134, -61.015724808747116],
          [57.65624999197012, 55.478853458027295],
          [179.29687497503375, 54.87660664883007],
        ],
      ],
    },
    label: "Asia Pacific",
  },
  {
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
  },
  {
    name: 4,
    id: 4,
    region_name: "Middle East & North East",
    bbox: {
      type: "Polygon",
      coordinates: [
        [
          [-29.82641601564615, 10.082644243860523],
          [-29.82641601564615, 52.446089149543],
          [72.20141321303812, 52.446089149543],
          [72.20141321303812, 10.082644243860523],
          [-29.82641601564615, 10.082644243860523],
        ],
      ],
    },
    label: "Middle East & North East",
  },
];

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

const Region = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const { id } = useParams<string>();
  const region = regionItems.find((item) => item.id.toString() === id);
  console.log(region);

  return (
    <Container maxWidth="lg">
      <Box sx={{ padding: "50px 0 30px 0" }}>
        <Typography
          variant="h1"
          textAlign={"center"}
          fontWeight={"bold"}
          textTransform={"capitalize"}
          letterSpacing={"1.6px"}
        >
          {region?.label}
        </Typography>
      </Box>
      <TitleHeader
        title="ONGOING Extreme Alerts"
        rightTitle={"View all alerts"}
        rightLinkURL={"/alerts/all"}
        filterKey="region"
        selectedFilter={region?.label}
      />
      <Box margin={"0px 25px 25px"}>
        <CardCarousel cards={cardData} />
      </Box>
      <TitleHeader
        title="ONGOING Extreme Alerts"
        rightTitle={"View all alerts"}
        rightLinkURL={"/alerts/all"}
        filterKey="region"
        selectedFilter={region?.label}
      />
      <MapComponent
        mapContainerRef={mapContainerRef}
        mapRef={mapRef}
        boundingRegionCoordinates={region?.bbox}
      />
    </Container>
  );
};

export default Region;
