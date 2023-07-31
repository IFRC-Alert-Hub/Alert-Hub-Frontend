import { Box, Typography } from "@mui/material";
import React from "react";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
type PopupHeaderProps = {
  alerts: any;
  handleClose?: () => void;
};

export const PopupHeader: React.FC<PopupHeaderProps> = (props) => {
  const { alerts, handleClose } = props;

  return (
    <Box
      sx={{
        backgroundColor: "white",
        color: "black",
        textAlign: "center",
        borderBottom: "1px solid black",
        padding: "10px",
        position: "relative", // To make sure the close button is positioned relative to this Box
      }}
    >
      <DisabledByDefaultIcon
        sx={{
          position: "absolute",
          top: "5px",
          right: "5px",
          cursor: "pointer",
        }}
        onClick={handleClose}
      />
      <Typography variant="h4" fontWeight={"bold"} textTransform={"uppercase"}>
        {alerts[0]?.country?.name} (
        {alerts.length > 1
          ? `${alerts.length} Alerts`
          : `${alerts.length} Alert`}
        )
      </Typography>
      <Typography variant="h5" textTransform={"uppercase"}>
        ISO3: {alerts[0]?.country?.iso3}
      </Typography>
    </Box>
  );
};
