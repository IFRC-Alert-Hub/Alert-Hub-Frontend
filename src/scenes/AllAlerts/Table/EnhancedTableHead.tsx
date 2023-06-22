import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Data, headCells } from "./Data";
import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Checkbox,
  MenuItem,
  Menu,
  Button,
} from "@mui/material";
import React from "react";
type Order = "asc" | "desc";

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  selectedFilter: string | null;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string | null>>;
  setSelected: React.Dispatch<React.SetStateAction<readonly string[]>>;
}
const EnhancedTableHead = (props: EnhancedTableProps) => {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    selectedFilter,
    setSelectedFilter,
    setSelected,
  } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [sortedColumn, setSortedColumn] = React.useState("");

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
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
      setSortedColumn(property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        <TableCell sx={{ textAlign: "center" }}>
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
            {selectedFilter === "All" ? "Regions" : selectedFilter || "Regions"}
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
              All Regions
            </MenuItem>
            <MenuItem onClick={() => handleFilterClick("Europe")}>
              Europe
            </MenuItem>
            <MenuItem onClick={() => handleFilterClick("Africa")}>
              Africa
            </MenuItem>
            <MenuItem onClick={() => handleFilterClick("America")}>
              America
            </MenuItem>
          </Menu>
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"center"}
            padding={"normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              sx={{
                padding: "0px",
                margin: "0px",
                borderRadius: "0px",
                borderBottom: "1px solid transparent",
                "&:hover": { backgroundColor: "transparent !important" },
                "&:focus": { backgroundColor: "transparent !important" },
                backgroundColor: "transparent !important",
                textTransform: "capitalize",

                minWidth: "auto",
                "& .MuiTableSortLabel-icon": {
                  display: "none",
                },
              }}
            >
              <span
                style={{
                  color:
                    (order === "desc" || order === "asc") &&
                    sortedColumn === headCell.id
                      ? "#f5333f"
                      : "black",
                }}
              >
                {headCell.label}
              </span>

              <Box
                component="span"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <KeyboardArrowUpIcon
                  fontSize="small"
                  sx={{
                    color:
                      order === "asc" && sortedColumn === headCell.id
                        ? "#f5333f"
                        : "black",
                    fontSize: "0.8rem !important",
                  }}
                />
                <KeyboardArrowDownIcon
                  fontSize="small"
                  sx={{
                    color:
                      order === "desc" && sortedColumn === headCell.id
                        ? "#f5333f"
                        : "black",
                    fontSize: "0.8rem !important",
                  }}
                />
              </Box>
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export { EnhancedTableHead };
