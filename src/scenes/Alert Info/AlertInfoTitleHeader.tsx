import { Typography, Box } from "@mui/material";

interface AlertInfoTitleHeaderProps {
  title: string;
}

const AlertInfoTitleHeader: React.FC<AlertInfoTitleHeaderProps> = ({
  title,
}) => {
  return (
    <Box
      minHeight={"20px"}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between", // Align items on the left and right
        borderBottom: "1px solid #c9c3c1",
      }}
      marginBottom={"10px"}
    >
      <Typography
        fontSize={"18px"}
        variant="h3"
        fontWeight="600"
        sx={{ m: "0 0 5px 0" }}
        textAlign={"left"}
        textTransform={"uppercase"}
        letterSpacing={"1.6px"}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default AlertInfoTitleHeader;
