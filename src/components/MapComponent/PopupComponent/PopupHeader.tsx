import { Box, Typography } from "@mui/material";
import React from "react";

type PopupHeaderProps = {
  alerts: any;
};

export const PopupHeader: React.FC<PopupHeaderProps> = (props) => {
  const { alerts } = props;

  return (
    <Box
      sx={{
        backgroundColor: "white",
        color: "black",
        textAlign: "center",
        borderBottom: "1px solid black",
        padding: "10px",
      }}
    >
      <Typography variant="h4" fontWeight={"bold"} textTransform={"uppercase"}>
        {alerts[0]?.country?.name}
      </Typography>
      <Typography variant="h5" textTransform={"uppercase"}>
        ISO3: {alerts[0]?.country?.iso3}
      </Typography>
    </Box>
  );
};
