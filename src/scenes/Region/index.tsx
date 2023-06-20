import { Box, Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import TitleHeader from "../../components/TitleHeader";
import AlertCard from "./AlertCard";

const regionItems = [
  {
    id: "0",
    name: "Africa",
    alertNum: 12,
  },
  {
    id: "1",
    name: "America",
    alertNum: 7,
  },
  {
    id: "2",
    name: "Asia Pacific",
    alertNum: 2,
  },
  {
    id: "3",
    name: "Europe",
    alertNum: 1,
  },
  {
    id: "4",
    name: "Middle East & North East",
    alertNum: 4,
  },
];

const Region = () => {
  const { id } = useParams<string>();
  const region = regionItems.find((item) => item.id === id);
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
          {region?.name}
        </Typography>
      </Box>
      <TitleHeader title="ONGOING EXTREME ALERTS" />
      <AlertCard />
    </Container>
  );
};

export default Region;
