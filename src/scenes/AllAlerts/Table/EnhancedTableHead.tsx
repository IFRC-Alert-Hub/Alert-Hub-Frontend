import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Data, RowsData, headCells } from "./Data";
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

  setSelected: React.Dispatch<React.SetStateAction<readonly RowsData[]>>;
  filters: typeof headCells;
  setFilters: React.Dispatch<React.SetStateAction<typeof headCells>>;
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

        {headCells.map((headCell) =>
          !headCell.isDropdownFilter ? (
            <TableCell
              key={headCell.id}
              align={"center"}
              padding={"normal"}
              sortDirection={orderBy === headCell.id ? order : false}
              sx={{ minWidth: headCell.minWidth }}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id as keyof Data)}
                sx={{
                  padding: "0px",
                  margin: "0px",
                  borderRadius: "0px",
                  borderBottom: "1px solid transparent",
                  "&:hover": { backgroundColor: "transparent !important" },
                  "&:focus": { backgroundColor: "transparent !important" },
                  backgroundColor: "transparent !important",
                  textTransform: "capitalize",

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
          ) : (
            <>
              {" "}
              <DropdownFilter
                TableCellTitle={headCell.title || ""}
                setSelected={setSelected}
                menuItems={headCell.menuItems || []}
                filters={filters}
                setFilters={setFilters}
                minWidth={headCell.minWidth}
              ></DropdownFilter>
            </>
          )
        )}
      </TableRow>
    </TableHead>
  );
};

export { EnhancedTableHead };
