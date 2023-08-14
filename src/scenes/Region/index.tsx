import { Box, Container, Typography } from "@mui/material";
import { Navigate, useParams } from "react-router-dom";
import { useMemo } from "react";
import { GetRegionData } from "../../Alert-Manager-API/Region";
import MapComponentWithFilter from "../../components/MapComponent/MapComponentWithFilter";

const Region = () => {
  const { id } = useParams<string>();
  const { data, loading, error, setFilters, refetch } = GetRegionData();

  useMemo(() => {
    refetch(Number(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const regions = [
    {
      name: "Africa",
      id: "1",
    },
    {
      name: "Americas",
      id: "2",
    },
    {
      name: "Asia Pacific",
      id: "3",
    },
    {
      name: "Europe",
      id: "4",
    },
    {
      name: "Middle East & North Africa",
      id: "5",
    },
  ];
  const selectedRegion = regions.find((region) => region.id === id);
  if (!selectedRegion) {
    return <Navigate to="/404" />;
  }

  return (
    <>
      <Container maxWidth="lg">
        <>
          <Container maxWidth="lg">
            <Box sx={{ padding: "50px 0 30px 0" }}>
              <Typography
                variant="h1"
                textAlign="center"
                fontWeight="bold"
                textTransform="capitalize"
                letterSpacing="1.6px"
              >
                {selectedRegion ? selectedRegion.name : "Region Not Found"}
              </Typography>
            </Box>
          </Container>
        </>
        <MapComponentWithFilter
          data={data}
          loading={loading}
          error={error}
          setFilters={setFilters}
          //boundingRegionCoordinates={data[0].bbox as any}
          isRegion={true}
        ></MapComponentWithFilter>
      </Container>
    </>
  );
};

export default Region;
