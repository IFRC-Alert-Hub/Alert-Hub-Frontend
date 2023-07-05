import { useEffect, useMemo, useState } from "react";
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
import { SubscriptionItem } from "../../API/queries/getSubscriptions";
import { useMutation } from "@apollo/client";
import { DELETE_SUBSCRIPTION } from "../../API/mutations/subscriptionMutation";
import { subscription_module } from "../../API/API_Links";

type PropsType = {
  tableData: SubscriptionItem[];
  setTableData: React.Dispatch<React.SetStateAction<SubscriptionItem[]>>;
};

interface UpdatedRow extends SubscriptionItem {
  filteredCountries: string[];
}

const SubscriptionTable = ({ tableData, setTableData }: PropsType) => {
  const [deleteSubscription] = useMutation(DELETE_SUBSCRIPTION, {
    client: subscription_module,
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [updatedRows, setUpdatedRows] = useState<UpdatedRow[]>();

  // show the first three countries
  useEffect(() => {
    const updatedItems = tableData.map((row: SubscriptionItem) => {
      let filteredCountries: string[];
      if (row.countryIds?.length > 3) {
        filteredCountries = row.countryIds.slice(0, 3);
        filteredCountries.push("...");
      } else {
        filteredCountries = row.countryIds;
      }
      return { ...row, filteredCountries };
    });
    setUpdatedRows(updatedItems);
  }, [tableData]);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = useMemo(
    () =>
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableData?.length) : 0,
    [page, rowsPerPage, tableData]
  );
  const visibleRows = useMemo(
    () =>
      updatedRows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, rowsPerPage, updatedRows]
  );

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

  const handleDelete = (id: string) => {
    deleteSubscription({ variables: { subscriptionId: parseInt(id) } });
    setTableData(tableData.filter((item) => item.id !== id));
  };

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
          {visibleRows?.map((row: UpdatedRow) => (
            <TableRow key={row.id}>
              <TableCell align="center" component="th" scope="row">
                {row.subscriptionName}
              </TableCell>

              <TableCell align="center">
                {row.countryIds?.length > 0 ? (
                  <Tooltip
                    title={`${row.countryIds?.length} countries are selected`}
                    arrow
                  >
                    <Box>{row.filteredCountries?.join(", ")}</Box>
                  </Tooltip>
                ) : (
                  <Tooltip title={"1 country is selected"} arrow>
                    <Box>{row.filteredCountries?.join(", ")}</Box>
                  </Tooltip>
                )}
              </TableCell>
              <TableCell align="center">
                {row.urgencyArray.join(", ")}
              </TableCell>
              <TableCell align="center">
                {row.severityArray.join(", ")}
              </TableCell>
              <TableCell align="center">
                {row.certaintyArray.join(", ")}
              </TableCell>
              <TableCell align="center">{row.subscribeBy.join(", ")}</TableCell>
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
                  onClick={() => handleDelete(row.id)}
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
        count={updatedRows ? updatedRows.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default SubscriptionTable;
