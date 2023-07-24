import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const TimeComponent: React.FC = () => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const getTime = () => {
      const date = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "numeric",
        hour12: true,
        timeZone: "UTC",
      };
      const formattedTime = date
        .toLocaleString("en-GB", options)
        .replace(" at", "");
      setCurrentTime(`${formattedTime} (UTC)`);
    };

    getTime();
    const interval = setInterval(getTime, 60000); // Update time every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <Typography variant="h6" textAlign={"center"} textTransform={"uppercase"}>
      {currentTime}
    </Typography>
  );
};

export default TimeComponent;
