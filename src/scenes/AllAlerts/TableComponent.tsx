import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  MenuItem,
  Menu,
  Typography,
  Button,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface Data {
  id: number;
  name: string;
  age: number;
  email: string;
  [key: string]: string | number;
}

const initialData: Data[] = [
  { id: 1, name: "John Doe", age: 41, email: "johndoe@example.com" },
  { id: 2, name: "Jane Smith", age: 32, email: "janesmith@example.com" },
  { id: 3, name: "Bob Johnson", age: 41, email: "bobjohnson@example.com" },
  { id: 4, name: "Bob Johnson", age: 41, email: "bobjohnson@example.com" },
  { id: 5, name: "John Doe", age: 41, email: "bobjohnson@example.com" },
  { id: 6, name: "John Doe", age: 22, email: "bobjohnson@example.com" },
];

const FilterableTableComponent: React.FC = () => {
  const [filters, setFilters] = useState<Record<string, string>>({});

  const filteredData = initialData.filter((data) => {
    for (const key in filters) {
      const filterValue = filters[key].toLowerCase();
      if (filterValue === "") continue; // Skip empty filters
      if (data[key].toString().toLowerCase() !== filterValue) {
        return false;
      }
    }
    return true;
  });

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (value: string) => {
    if (value === "All") {
      setFilters((prevFilters) => ({ ...prevFilters, name: "" }));
    } else {
      setFilters((prevFilters) => ({ ...prevFilters, name: value }));
    }
    handleClose();
  };
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <Button
              id="demo-customized-button"
              aria-controls={anchorEl ? "demo-customized-menu" : undefined}
              aria-haspopup="true"
              variant="contained"
              disableElevation
              disableRipple
              onClick={handleClick}
              endIcon={<KeyboardArrowDownIcon />}
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
              {filters["name"] || "Name"}
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
              onClose={handleClose}
            >
              <MenuItem onClick={() => handleMenuItemClick("All")}>
                All Users
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick("John Doe")}>
                John Doe
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick("Jane Smith")}>
                Jane Smith
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick("Bob Johnson")}>
                Bob Johnson
              </MenuItem>
            </Menu>
          </TableCell>
          <TableCell>Age</TableCell>
          <TableCell>Email</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {filteredData.map((data) => (
          <TableRow key={data.id}>
            <TableCell>{data.name}</TableCell>
            <TableCell>{data.age}</TableCell>
            <TableCell>{data.email}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default FilterableTableComponent;
