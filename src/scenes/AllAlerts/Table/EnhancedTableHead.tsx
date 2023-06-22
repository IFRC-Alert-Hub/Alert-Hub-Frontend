import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Data, headCells, initialFilters } from "./Data";
import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Checkbox,
} from "@mui/material";
import React from "react";
import DropdownFilter from "./DropdownFilter";
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

  setSelected: React.Dispatch<React.SetStateAction<readonly string[]>>;
  filters: typeof initialFilters;
  setFilters: React.Dispatch<React.SetStateAction<typeof initialFilters>>;
}
const EnhancedTableHead = (props: EnhancedTableProps) => {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    setSelected,
    filters,
    setFilters,
  } = props;

  const [sortedColumn, setSortedColumn] = React.useState("");

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
        {filters.map((item) => (
          <DropdownFilter
            TableCellTitle={item.title}
            setSelected={setSelected}
            menuItems={item.menuItems}
            filters={filters}
            setFilters={setFilters}
          ></DropdownFilter>
        ))}

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
