import { Typography, Box } from "@mui/material";

interface TitleHeaderProps {
  title: string;
}

const TitleHeader: React.FC<TitleHeaderProps> = ({ title }) => {
  return (
    <Box
      minHeight={"40px"}
      sx={{
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid #c9c3c1",
      }}
      marginBottom={"10px"}
    >
      <Typography
        variant="h3"
        fontWeight="600"
        sx={{ m: "0 0 5px 0" }}
        textAlign={"left"}
        textTransform={"uppercase"}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default TitleHeader;
