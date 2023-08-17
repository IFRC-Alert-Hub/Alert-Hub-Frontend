import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { EffectivePopup } from "./DatePickerPopup";

interface DatePickerComponentProps {
  selectedDate: [number | null, number | null] | undefined;
  setSelectedDate: React.Dispatch<
    React.SetStateAction<[number | null, number | null] | undefined>
  >;
  datePickerTitle: string;
}

const DatePickerComponent: React.FC<DatePickerComponentProps> = ({
  selectedDate,
  setSelectedDate,
  datePickerTitle,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const getSelectedDates = (
    selectedDate: [number | null, number | null] | undefined
  ) => {
    const startDate = new Date((selectedDate?.[0] as number) * 1000);
    const endDate = new Date((selectedDate?.[1] as number) * 1000);
    const dateRange = `${String(startDate.getDate()).padStart(2, "0")}/${String(
      startDate.getMonth() + 1
    ).padStart(2, "0")}/${startDate.getFullYear()} - ${String(
      endDate.getDate()
    ).padStart(2, "0")}/${String(endDate.getMonth() + 1).padStart(
      2,
      "0"
    )}/${endDate.getFullYear()}`;

    return dateRange;
  };
  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id="demo-customized-button"
        size="small"
        variant="outlined"
        aria-controls={anchorEl ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={anchorEl ? "true" : undefined}
        onClick={handleMenuOpen}
        endIcon={<ArrowDropDownIcon sx={{ color: "#787474" }} />}
        sx={{
          display: "flex",
          justifyContent: "space-between", // Places the Typography and icon on opposite ends
          alignItems: "center", // Centers the content vertically within the Button
          height: "28px",
          width: "150px",
          backgroundColor: "#f4f4f4",
          borderColor: "#E0E3E7",
          "&:hover": {
            borderColor: "#B2BAC2",
            backgroundColor: "#f4f4f4",
          },
        }}
      >
        <Typography
          textTransform={"capitalize"}
          sx={{
            textAlign: "left",
            color:
              selectedDate !== undefined &&
              selectedDate[0] !== null &&
              selectedDate[1] !== null
                ? "#f5333f"
                : "#8D8D8D",
            fontSize: "0.875rem",
            fontWeight:
              selectedDate !== undefined &&
              selectedDate[0] !== null &&
              selectedDate[1] !== null
                ? "600"
                : "",
          }}
        >
          <Typography
            textTransform={"capitalize"}
            sx={{
              maxWidth: "100px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              textTransform: "capitalize",
              fontWeight: "600",
            }}
          >
            {selectedDate![0] !== null && selectedDate![1] !== null
              ? getSelectedDates(selectedDate)
              : datePickerTitle}
          </Typography>
        </Typography>
      </Button>
      <EffectivePopup
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorEl={anchorEl}
        setSelectedDate={setSelectedDate}
      />
    </>
  );
};

export default DatePickerComponent;
