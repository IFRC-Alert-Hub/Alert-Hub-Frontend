import React, { useEffect } from "react";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import { Admin1_Alert_Data } from "../../Alert-Manager-API/types";
import Progress from "../Layout/Progress";
import { Box, Typography } from "@mui/material";

interface PopupComponentProps {
  handleClose?: () => void;
  loading?: boolean;
  error?: string | null;
  data?: Admin1_Alert_Data;
}
export const PopupComponentTest: React.FC<PopupComponentProps> = ({
  handleClose,
  loading,
  error,
  data,
}) => {
  useEffect(() => {
    if (!loading && !error) {
      console.log("DATA: ", data);
    }
  });
  return (
    <Box sx={{ backgroundColor: "red", height: "100%" }}>
      {!loading && !error && (
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
          <Typography
            variant="h4"
            fontWeight={"bold"}
            textTransform={"uppercase"}
          >
            {data?.admin1_name} (
            {data!.alerts.length > 1
              ? `${data?.alerts.length} Alerts`
              : `${data?.alerts.length} Alert`}
            )
          </Typography>
          <Typography variant="h5" textTransform={"uppercase"}>
            Country Name (ISO3)
          </Typography>
        </Box>
      )}

      <Box>
        <DisabledByDefaultIcon
          sx={{
            position: "absolute",
            top: "5px",
            right: "5px",
            cursor: "pointer",
          }}
          onClick={handleClose}
        />
      </Box>
    </Box>
  );
};
