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
import { Data, RowsData, headCells, rows } from "./Data";
import { EnhancedTableToolbar } from "./EnhancedTableToolbar";
import { EnhancedTableHead } from "./EnhancedTableHead";

type Order = "asc" | "desc";

interface EnhancedTableProps {
  selectedFilter?: string;
  filterKey?: string;
}

const EnhancedTable = (props: EnhancedTableProps) => {
  const { selectedFilter, filterKey } = props;
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("country");
  const [selected, setSelected] = React.useState<readonly RowsData[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [filters, setFilters] = React.useState(headCells);

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
    let filteredData = rows;

    filters.forEach((filter) => {
      if (filter.isDropdownFilter) {
        if (filter.selectedFilter && filter.selectedFilter !== "All") {
          filteredData = filteredData.filter(
            (row) =>
              getProperty(row, filter.filterKey) === filter.selectedFilter
          );
        }
      }
    });

    return filteredData;
  }, [filters]);

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
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

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
                    key={row.country}
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
                    <TableCell align="center">{row.region}</TableCell>
                    <TableCell align="center">{row.country}</TableCell>
                    <TableCell align="center">{row.event}</TableCell>
                    <TableCell align="center">{row.effective}</TableCell>
                    <TableCell align="center">{row.expires}</TableCell>
                    <TableCell align="center">{row.urgency}</TableCell>
                    <TableCell align="center">{row.severity}</TableCell>
                    <TableCell align="center">{row.certainty}</TableCell>
                    <TableCell align="center">{row.sender}</TableCell>
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
          <Typography variant="h5" textAlign={"center"}>
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
