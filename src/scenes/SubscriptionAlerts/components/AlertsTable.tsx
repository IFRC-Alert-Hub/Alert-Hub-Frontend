import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, TablePagination } from "@mui/material";
import { useState } from "react";
import { SubscriptionAlertsType } from "../../../API/TYPES";

type PropsType = {
  alertsData: SubscriptionAlertsType[];
};

const AlertsTable = ({ alertsData }: PropsType) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="alerts table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: "0.875rem", fontWeight: 600 }}>
                Event
              </TableCell>
              <TableCell
                align="left"
                sx={{ fontSize: "0.875rem", fontWeight: 600 }}
              >
                Location
              </TableCell>
              <TableCell
                align="left"
                sx={{ fontSize: "0.875rem", fontWeight: 600 }}
              >
                Event Category
              </TableCell>
              <TableCell
                align="left"
                sx={{ fontSize: "0.875rem", fontWeight: 600 }}
              >
                Sent Time
              </TableCell>
              <TableCell
                align="left"
                sx={{ fontSize: "0.875rem", fontWeight: 600 }}
              >
                Operation
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {alertsData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ fontSize: "0.875rem" }}
                  >
                    {row.event}
                  </TableCell>
                  <TableCell align="left" sx={{ fontSize: "0.875rem" }}>
                    {row.admin1s}
                  </TableCell>
                  <TableCell align="left" sx={{ fontSize: "0.875rem" }}>
                    {row.event}
                  </TableCell>
                  <TableCell align="left" sx={{ fontSize: "0.875rem" }}>
                    {row.sent}
                  </TableCell>
                  <TableCell align="left" sx={{ fontSize: "0.875rem" }}>
                    <Button
                      variant="text"
                      size="small"
                      sx={{
                        color: "red",
                        minWidth: 0,
                        p: 0,
                        fontSize: "0.875rem",
                        textTransform: "capitalize",
                        "&:hover": {
                          opacity: "0.7",
                        },
                      }}
                    >
                      View Detail
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={alertsData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default AlertsTable;
