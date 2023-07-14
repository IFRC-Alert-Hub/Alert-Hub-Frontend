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
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import {
  ContinentType,
  CountryType,
  GET_SUBSCRIPTIONS,
  SubscriptionForm,
  SubscriptionItem,
} from "../../API/queries/getSubscriptions";
import { useMutation } from "@apollo/client";
import { DELETE_SUBSCRIPTION } from "../../API/mutations/subscriptionMutation";
import { subscription_module } from "../../API/API_Links";
import ModalForm from "./ModalForm";

type PropsType = {
  selectedRow: SubscriptionForm;
  setSelectedRow: React.Dispatch<React.SetStateAction<SubscriptionForm>>;
  formType: string;
  countryList: CountryType[];
  regionList: ContinentType[];
  tableData: SubscriptionItem[];
  setTableData: React.Dispatch<React.SetStateAction<SubscriptionItem[]>>;
  open: boolean;
  handleOpen: (type: string, id?: string) => void;
  handleClose: () => void;
};

interface UpdatedRow extends SubscriptionItem {
  filteredCountryNames: (string | undefined)[];
}

const SubscriptionTable = ({
  selectedRow,
  setSelectedRow,
  formType,
  countryList,
  regionList,
  tableData,
  setTableData,
  open,
  handleOpen,
  handleClose,
}: PropsType) => {
  const [deleteSubscription] = useMutation(DELETE_SUBSCRIPTION, {
    refetchQueries: [GET_SUBSCRIPTIONS, "FetchSubscriptions"],
    client: subscription_module,
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [updatedRows, setUpdatedRows] = useState<UpdatedRow[]>();
  const [confirmDelete, setConfirmDelete] = useState(false);

  // show the first three countries
  useEffect(() => {
    const updatedItems = tableData.map((row: SubscriptionItem) => {
      if (row.countryIds?.length > 3) {
        const filteredCountryIds = row.countryIds.slice(0, 3);
        const filteredCountryNames = filteredCountryIds.map((countryId) => {
          const foundCountry = countryList.find(
            (country) => country.id === countryId.toString()
          );
          return foundCountry?.name;
        });
        filteredCountryNames.push("...");
        return { ...row, filteredCountryNames };
      } else {
        const filteredCountryIds = row.countryIds;
        const filteredCountryNames = filteredCountryIds.map((countryId) => {
          const foundCountry = countryList?.find(
            (country) => country.id === countryId.toString()
          );
          return foundCountry?.name;
        });
        return { ...row, filteredCountryNames };
      }
    });
    setUpdatedRows(updatedItems);
  }, [tableData, countryList]);

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
            <TableCell
              align="center"
              sx={{
                fontSize: "0.875rem",
                fontWeight: "600",
                minWidth: "150px",
              }}
            >
              Title
            </TableCell>
            <TableCell
              align="center"
              sx={{ fontSize: "0.875rem", fontWeight: "600" }}
            >
              Subscribed Countries
            </TableCell>
            <TableCell
              align="center"
              sx={{ fontSize: "0.875rem", fontWeight: "600" }}
            >
              Urgency
            </TableCell>
            <TableCell
              align="center"
              sx={{ fontSize: "0.875rem", fontWeight: "600" }}
            >
              Severity
            </TableCell>
            <TableCell
              align="center"
              sx={{ fontSize: "0.875rem", fontWeight: "600" }}
            >
              Certainty
            </TableCell>
            <TableCell
              align="center"
              sx={{ fontSize: "0.875rem", fontWeight: "600" }}
            >
              Notification Methods
            </TableCell>
            <TableCell
              align="center"
              sx={{ fontSize: "0.875rem", fontWeight: "600" }}
            >
              Operations
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {visibleRows?.map((row: UpdatedRow) => (
            <TableRow key={row.id}>
              <TableCell
                align="center"
                sx={{ fontSize: "0.875rem" }}
                component="th"
                scope="row"
              >
                <Button
                  sx={{
                    color: "black",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    textDecoration: "underline",
                    textTransform: "capitalize",
                    "&:hover": {
                      color: "red",
                      textDecoration: "underline",
                    },
                  }}
                  disableRipple
                >
                  {row.subscriptionName}
                </Button>
              </TableCell>

              <TableCell align="center" sx={{ fontSize: "0.875rem" }}>
                {row.countryIds?.length > 1 ? (
                  <Tooltip
                    title={`${row.countryIds?.length} countries are selected`}
                    arrow
                  >
                    <Box>{row.filteredCountryNames?.join(", ")}</Box>
                  </Tooltip>
                ) : (
                  <Tooltip title={"1 country is selected"} arrow>
                    <Box>{row.filteredCountryNames?.join(", ")}</Box>
                  </Tooltip>
                )}
              </TableCell>
              <TableCell align="center" sx={{ fontSize: "0.875rem" }}>
                {row.urgencyArray.join(", ")}
              </TableCell>
              <TableCell align="center" sx={{ fontSize: "0.875rem" }}>
                {row.severityArray.join(", ")}
              </TableCell>
              <TableCell align="center" sx={{ fontSize: "0.875rem" }}>
                {row.certaintyArray.join(", ")}
              </TableCell>
              <TableCell align="center" sx={{ fontSize: "0.875rem" }}>
                {row.subscribeBy.join(", ")}
              </TableCell>
              <TableCell align="center" sx={{ minWidth: "130px" }}>
                {/* <Button
                  variant="text"
                  size="small"
                  color="error"
                  onClick={() => handleOpen("Edit", row.id)}
                  sx={{ minWidth: 0, marginRight: "5px" }}
                >
                  View
                </Button> */}
                <Button
                  variant="text"
                  size="small"
                  onClick={() => handleOpen("Edit", row.id)}
                  sx={{
                    color: "red",
                    minWidth: 0,
                    padding: "5px",
                    mr: "5px",
                    fontSize: "0.875rem",
                    "&:hover": {
                      opacity: "0.7",
                    },
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="text"
                  size="small"
                  onClick={() => setConfirmDelete(true)}
                  sx={{
                    color: "red",
                    minWidth: 0,
                    padding: "5px",
                    fontSize: "0.875rem",
                    "&:hover": {
                      opacity: "0.7",
                    },
                  }}
                >
                  Delete
                </Button>
                <Dialog
                  open={confirmDelete}
                  onClose={() => {
                    setConfirmDelete(false);
                  }}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Delete the subscription"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Are you sure to delete this subscription?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() => {
                        setConfirmDelete(false);
                      }}
                      variant="outlined"
                      color="error"
                      size="small"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        handleDelete(row.id);
                        setConfirmDelete(false);
                      }}
                      autoFocus
                      variant="contained"
                      color="error"
                      size="small"
                    >
                      Confirm
                    </Button>
                  </DialogActions>
                </Dialog>
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
      {visibleRows?.length === 0 && (
        <Typography
          variant="h6"
          textAlign={"center"}
          padding={"20px"}
          color={"gray"}
        >
          {" "}
          No subscription groups added.
        </Typography>
      )}
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={updatedRows ? updatedRows.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <ModalForm
        selectedRow={selectedRow}
        setSelectedRow={setSelectedRow}
        formType={formType}
        tableData={tableData}
        setTableData={setTableData}
        countryList={countryList}
        regionList={regionList}
        open={open}
        handleClose={handleClose}
      />
    </TableContainer>
  );
};

export default SubscriptionTable;
