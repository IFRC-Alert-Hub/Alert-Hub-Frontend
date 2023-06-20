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
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        timeZone: "GMT",
      };
      const formattedTime = date
        .toLocaleString("en-US", options)
        .replace(" at", "");
      setCurrentTime(`${formattedTime} (GMT)`);
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
