import { Box, Card, CardContent, Typography } from "@mui/material";
import React, { ReactNode } from "react";
import { Alert } from "../../../Alert-Manager-API/types";
type PopupCardProps = {
  alerts?: Alert[];
  iconComponent?: ReactNode;
  iconText?: string;
  rightText?: String;
};

export const PopupCard: React.FC<PopupCardProps> = (props) => {
  const { iconComponent, iconText, rightText } = props;
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#f0ecec",
        height: "50px",
      }}
    >
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
