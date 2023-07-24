import { Button, Menu, MenuItem, TableCell } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React from "react";
import { RowsData, headCells } from "./Data";
interface DropdownFilterProps {
  setSelected: React.Dispatch<React.SetStateAction<readonly RowsData[]>>;
  TableCellTitle: string;
  menuItems: string[];
  filters: typeof headCells;
  setFilters: React.Dispatch<React.SetStateAction<typeof headCells>>;
  minWidth: string;
  allMenuItemTitle: string;
}

const DropdownFilter = (props: DropdownFilterProps) => {
  const {
    setSelected,
    TableCellTitle,
    menuItems,
    filters,
    setFilters,
    minWidth,
    allMenuItemTitle,
  } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const [buttonSelected, setButtonSelected] = React.useState(true);

  const handleFilterClick = (value: string) => {
    const updatedFilters = filters.map((filter) => {
      console.log("FILTER: ", filter);
      if (filter.title === TableCellTitle) {
        return { ...filter, selectedFilter: value };
      }
      return filter;
    });
    setFilters(updatedFilters);
    setAnchorEl(null);
    setSelected([]);
    setButtonSelected(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <TableCell sx={{ textAlign: "center" }}>
        {" "}
        <Button
          id="demo-customized-button"
          aria-controls={anchorEl ? "demo-customized-menu" : undefined}
          aria-haspopup="true"
          variant="contained"
          disableElevation
          disableRipple
          onClick={handleClick}
          endIcon={<KeyboardArrowDownIcon sx={{ color: "#f5333f" }} />}
          sx={{
            padding: "0px",
            borderRadius: "0px",
            borderBottom: "1px solid transparent",
            "&:hover": { backgroundColor: "transparent !important" },
            "&:focus": { backgroundColor: "transparent !important" },
            backgroundColor: "transparent !important",
            textTransform: "capitalize",
            color:
              buttonSelected &&
              filters
                .filter((filter) => filter.title === TableCellTitle)
                .map((filter) => filter.selectedFilter)[0] !== "All"
                ? "red"
                : "black",
            minWidth: minWidth,
          }}
        >
          {filters
            .filter((filter) => filter.title === TableCellTitle)
            .map((filter) => filter.selectedFilter)[0] === "All"
            ? TableCellTitle
            : filters
                .filter((filter) => filter.title === TableCellTitle)
                .map((filter) => filter.selectedFilter)[0] || TableCellTitle}
        </Button>
        <Menu
          elevation={0}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          id="demo-customized-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClick={handleClose}
        >
          <MenuItem onClick={() => handleFilterClick("All")}>
            {allMenuItemTitle}
          </MenuItem>
          {menuItems.map((item) => (
            <MenuItem onClick={() => handleFilterClick(item)}>{item}</MenuItem>
          ))}
        </Menu>
      </TableCell>
    </>
  );
};

export default DropdownFilter;
