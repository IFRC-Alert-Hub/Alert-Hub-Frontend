import { Button, Menu, MenuItem, TableCell } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React from "react";
interface DropdownFilterProps {
  selectedFilter: string | null;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string | null>>;
  setSelected: React.Dispatch<React.SetStateAction<readonly string[]>>;
  TableCellTitle: string;
  menuItems: string[];
}

const DropdownFilter = (props: DropdownFilterProps) => {
  const {
    selectedFilter,
    setSelectedFilter,
    setSelected,
    TableCellTitle,
    menuItems,
  } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClick = (value: string) => {
    setSelectedFilter(value);
    setAnchorEl(null);
    setSelected([]);
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
          }}
        >
          {selectedFilter === "All"
            ? TableCellTitle
            : selectedFilter || TableCellTitle}
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
            All {TableCellTitle}s
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
