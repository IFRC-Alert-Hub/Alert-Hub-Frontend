import React, { useState } from "react";
import { Box, Button, Menu } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

interface EffectivePopupProps {
  open: boolean;
  onClose: () => void;
  anchorEl: HTMLElement | null;
  setSelectedDate: React.Dispatch<
    React.SetStateAction<[number | null, number | null] | undefined>
  >;
}

export const EffectivePopup: React.FC<EffectivePopupProps> = ({
  open,
  onClose,
  anchorEl,
  setSelectedDate,
}) => {
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);

  const handleFromDateChange = (date: Date | null) => {
    setFromDate(date);
  };

  const handleToDateChange = (date: Date | null) => {
    setToDate(date);
  };

  const handleClear = () => {
    setFromDate(null);
    setToDate(null);
    setSelectedDate([null, null]);
  };
  const handleSearch = () => {
    if (!fromDate) {
      alert("Please enter the From date.");
      return;
    }

    if (!toDate) {
      alert("Please enter the To date.");
      return;
    }

    const fromDateTime = fromDate ? new Date(fromDate) : null;
    const fromUnixTimestamp = fromDateTime
      ? fromDateTime.getTime() / 1000
      : null;

    const toDateTime = toDate ? new Date(toDate) : null;
    const toUnixTimestamp = toDateTime ? toDateTime.getTime() / 1000 : null;
    setSelectedDate([fromUnixTimestamp, toUnixTimestamp]);
    onClose();
  };

  return (
    <Menu open={open} onClose={onClose} anchorEl={anchorEl}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        padding="10px"
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="From"
            value={fromDate}
            onChange={handleFromDateChange}
            format="DD/MM/YYYY"
            sx={{ paddingBottom: "10px" }}
            maxDate={toDate ?? undefined}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="To"
            value={toDate}
            onChange={handleToDateChange}
            disablePast
            minDate={fromDate ?? undefined}
            format="DD/MM/YYYY"
            sx={{ paddingBottom: "10px" }}
          />
        </LocalizationProvider>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          <Button
            type="submit"
            onClick={handleClear}
            variant="contained"
            disableElevation={true}
            sx={{
              color: "#f5333f",
              outline: "red",
              textTransform: "capitalize",
              padding: "0px ",
              borderRadius: "10px",
              backgroundColor: "none",
              "&:hover": {
                backgroundColor: "rgba(245,51,63,.16)",
                boxShadow: "inset 0 0 0 1px #f5333f",
              },
              boxShadow: "inset 0 0 0 1px #f5333f",
            }}
          >
            Clear
          </Button>
          <Button
            type="submit"
            onClick={handleSearch}
            variant="contained"
            disableElevation={true}
            sx={{
              color: "#f5333f",
              outline: "red",
              textTransform: "capitalize",
              padding: "0px ",
              borderRadius: "10px",
              backgroundColor: "none",
              "&:hover": {
                backgroundColor: "rgba(245,51,63,.16)",
                boxShadow: "inset 0 0 0 1px #f5333f",
              },
              boxShadow: "inset 0 0 0 1px #f5333f",
            }}
          >
            Apply
          </Button>
        </Box>
      </Box>
    </Menu>
  );
};
