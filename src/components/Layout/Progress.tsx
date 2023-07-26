import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Progress = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "20vh",
      }}
    >
      <CircularProgress color="error" />
    </Box>
  );
};

export default Progress;
