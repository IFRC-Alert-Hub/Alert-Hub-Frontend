import { Box, Card, CardContent, Typography } from "@mui/material";
import React, { ReactNode } from "react";
import { AlertData } from "../MapComponent";
type PopupCardProps = {
  alerts?: AlertData[];
  iconComponent?: ReactNode;
  iconText?: string;
  rightText?: String;
};

export const PopupCard: React.FC<PopupCardProps> = (props) => {
  const { iconComponent, iconText, rightText } = props;
  return (
    <Card sx={{ display: "flex", backgroundColor: "#f0ecec" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: "15px",
        }}
      >
        {iconComponent}
        <Typography
          component="h5"
          fontSize="11px"
          fontWeight="500"
          variant="body1"
        >
          {iconText}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography
            component="h5"
            fontSize="13px"
            fontWeight="500"
            variant="body1"
          >
            {rightText}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};
