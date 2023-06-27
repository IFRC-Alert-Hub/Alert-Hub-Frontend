import { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
  Tooltip,
  Box,
} from "@mui/material";

interface SubscriptionData {
  id: number;
  title: string;
  countries: string[];
  urgency: string[];
  severity: string[];
  certainty: string[];
  method: string[];
  displayedCountries?: string[];
}

type PropsType = {
  rows: SubscriptionData[];
};

const SubscriptionTable = ({ rows }: PropsType) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // show the first three countries
  const updatedRows = rows.map((row) => {
    let filteredCountries: string[];
    if (row.countries.length > 3) {
      filteredCountries = row.countries.slice(0, 3);
      filteredCountries.push("...");
    } else {
      filteredCountries = row.countries;
    }
    return { ...row, filteredCountries };
  });

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(
    () =>
      updatedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, rowsPerPage, updatedRows]
  );

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="subscription table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Group Title</TableCell>
            <TableCell align="center">Subscribed Countries</TableCell>
            <TableCell align="center">Urgency</TableCell>
            <TableCell align="center">Severity</TableCell>
            <TableCell align="center">Certainty</TableCell>
            <TableCell align="center">Subscription Methods</TableCell>
            <TableCell align="center">Operations</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {visibleRows.map((row) => (
            <TableRow key={row.id}>
              <TableCell align="center" component="th" scope="row">
                {row.title}
              </TableCell>

              <TableCell align="center">
                {row.countries.length > 0 ? (
                  <Tooltip
                    title={`${row.countries.length} countries are selected`}
                    arrow
                  >
                    <Box>{row.filteredCountries.join(", ")}</Box>
                  </Tooltip>
                ) : (
                  <Tooltip title={"1 country is selected"} arrow>
                    <Box>{row.filteredCountries.join(", ")}</Box>
                  </Tooltip>
                )}
              </TableCell>
              <TableCell align="center">{row.urgency}</TableCell>
              <TableCell align="center">{row.severity}</TableCell>
              <TableCell align="center">{row.certainty}</TableCell>
              <TableCell align="center">{row.method}</TableCell>
              <TableCell align="center">
                <Button
                  variant="text"
                  size="small"
                  color="error"
                  sx={{ minWidth: 0, marginRight: "5px" }}
                >
                  Edit
                </Button>
                <Button
                  variant="text"
                  size="small"
                  color="error"
                  sx={{ minWidth: 0 }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow
              style={{
                height: 62 * emptyRows,
              }}
            >
              <TableCell colSpan={7} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={updatedRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default SubscriptionTable;
