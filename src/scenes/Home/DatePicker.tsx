import React, { useState } from "react";
import { Box, Button, Menu, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface EffectivePopupProps {
  open: boolean;
  onClose: () => void;
  anchorEl: HTMLElement | null;
}

const EffectivePopup: React.FC<EffectivePopupProps> = ({
  open,
  onClose,
  anchorEl,
}) => {
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);

  const handleFromDateChange = (date: Date | null) => {
    setFromDate(date);
  };

  const handleToDateChange = (date: Date | null) => {
    setToDate(date);
  };

  const handleSearch = () => {
    console.log("From date:", fromDate);
    console.log("To date:", toDate);
    const fromDateTime = fromDate ? new Date(fromDate) : null;
    const fromUnixTimestamp = fromDateTime
      ? fromDateTime.getTime() / 1000
      : null;
    console.log("FROM Unix timestamp:", fromUnixTimestamp);

    const toDateTime = toDate ? new Date(toDate) : null;
    const toUnixTimestamp = toDateTime ? toDateTime.getTime() / 1000 : null;
    console.log("TO Unix timestamp:", toUnixTimestamp);
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
    </Menu>
  );
};

const DatePickerComponent: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={anchorEl ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={anchorEl ? "true" : undefined}
        variant="contained"
        disableElevation
        disableRipple
        onClick={handleMenuOpen}
        endIcon={<KeyboardArrowDownIcon sx={{ color: "#f5333f" }} />}
        sx={{
          p: 0,
          borderRadius: "0px",
          borderBottom: "1px solid transparent",
          "&:hover": { backgroundColor: "transparent !important" },
          "&:focus": { backgroundColor: "transparent !important" },
          height: "100%",
          padding: "0 10px",
          backgroundColor: "transparent !important",
        }}
      >
        <Typography variant="h6" textTransform={"capitalize"}>
          Effective
        </Typography>
      </Button>
      <EffectivePopup
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorEl={anchorEl}
      />
    </div>
  );
};

export default DatePickerComponent;
