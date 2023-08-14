import * as React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
  Checkbox,
  Typography,
} from "@mui/material";

import { getComparator, stableSort } from "./Sorting";

import { Data, Order, RowsData, headCells } from "./Data";

import { EnhancedTableToolbar } from "./EnhancedTableToolbar";
import { EnhancedTableHead } from "./EnhancedTableHead";
import { Link } from "react-router-dom";

interface EnhancedTableProps {
  selectedFilter?: string;
  filterKey?: string;
  rowsData: RowsData[];
  setNumAlerts: (numAlerts: number) => void;
}
function modifyDateTime(timestamp: string) {
  const date = new Date(timestamp);

  const formattedDateTime = date.toLocaleString("en-US");
  return formattedDateTime;
}

const EnhancedTable = (props: EnhancedTableProps) => {
  const { selectedFilter, filterKey, rowsData, setNumAlerts } = props;
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [selected, setSelected] = React.useState<readonly RowsData[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [filters, setFilters] = React.useState(headCells);

  const [selectedSent, setSelectedSent] = React.useState<
    [number | null, number | null] | undefined
  >([null, null]);

  React.useEffect(() => {
    setFilters((prevFilters) => {
      return prevFilters.map((filter) => {
        if (filter.filterKey === filterKey) {
          return {
            ...filter,
            selectedFilter: selectedFilter,
          };
        }
        return filter;
      });
    });
  }, [selectedFilter, filterKey]);

  const getProperty = (object: any, key: string | undefined) => {
    if (key === undefined) {
      return undefined;
    }

    return key
      .split(".")
      .reduce((obj: any, property: string) => obj?.[property], object);
  };
  const filteredRows = React.useMemo(() => {
    let filteredData = rowsData;

    filters.forEach((filter) => {
      if (filter.isDropdownFilter) {
        if (filter.selectedFilter && filter.selectedFilter !== "All") {
          filteredData = filteredData.filter(
            (row) =>
              getProperty(row, filter.filterKey).toLowerCase() ===
              filter.selectedFilter?.toLowerCase()
          );
        }
      }
    });

    if (selectedSent && selectedSent[0] !== null && selectedSent[1] !== null) {
      filteredData = filteredData.filter((alert) => {
        const expiresTimestamp =
          new Date(alert.sent as string).getTime() / 1000;
        if (
          expiresTimestamp >= selectedSent[0]! &&
          expiresTimestamp <= selectedSent[1]!
        ) {
          return true;
        }
        return false;
      });
    }

    return filteredData;
  }, [filters, rowsData, selectedSent]);

  const visibleRows = React.useMemo(
    () =>
      stableSort(filteredRows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [filteredRows, order, orderBy, page, rowsPerPage]
  );

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    const isDesc = orderBy === property && order === "desc";

    if (isAsc) {
      setOrder("desc");
      setOrderBy(property);
    } else if (isDesc) {
      setOrderBy("");
    } else {
      setOrder("asc");
      setOrderBy(property);
    }
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = filteredRows;
      console.log(filteredRows);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: RowsData) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly RowsData[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: RowsData) => selected.indexOf(name) !== -1;
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rowsData.length) : 0;

  React.useEffect(() => {
    setNumAlerts(filteredRows.length);
  }, [filteredRows, setNumAlerts]);
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          selected={selected}
          numSelected={selected.length}
        />
        <TableContainer>
          <Table aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={filteredRows.length}
              setSelected={setSelected}
              filters={filters}
              setFilters={setFilters}
              selectedSent={selectedSent}
              setSelectedSent={setSelectedSent}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    selected={isItemSelected}
                    sx={{
                      cursor: "pointer",
                      textAlign: "center",
                      "& .MuiTableCell-root": { textAlign: "center" },
                    }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">{row.identifier}</TableCell>
                    <TableCell align="center">{row.event}</TableCell>
                    <TableCell align="center">{row.eventCategory}</TableCell>
                    <TableCell align="center">
                      {modifyDateTime(row.sent)}
                    </TableCell>
                    <TableCell align="center">
                      <Link to={row.sender}>{row.sender}</Link>
                    </TableCell>
                    <TableCell align="center">{row.region}</TableCell>
                    <TableCell align="center">{row.country}</TableCell>
                    <TableCell align="center">
                      <Link
                        to={`/alerts/${row.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Alert Info
                      </Link>{" "}
                    </TableCell>
                  </TableRow>
                );
              })}

              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {filteredRows.length === 0 ? (
          <Typography variant="h6" textAlign={"center"} padding={"10px"}>
            {" "}
            🔍 No results found. Please remove some filters.
          </Typography>
        ) : (
          ""
        )}

        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default EnhancedTable;
