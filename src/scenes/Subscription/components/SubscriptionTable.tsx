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
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

import { useMutation } from "@apollo/client";
import { DELETE_SUBSCRIPTION } from "../../../API/mutations/subscriptionMutations";
import { subscription_module } from "../../../API/API_Links";
import { GET_SUBSCRIPTIONS } from "../../../API/ALL_QUERIES";
import { SubscriptionForm, UpdatedSubscriptionItem } from "../../../API/TYPES";
import CollapsibleRow from "./CollapsibleRow";

type PropsType = {
  updatedSubscriptions: UpdatedSubscriptionItem[];
  modalOpen: boolean;
  handleModalOpen: () => void;
  setFormType: React.Dispatch<React.SetStateAction<string>>;
  setSelectedRow: React.Dispatch<React.SetStateAction<SubscriptionForm>>;
};

const SubscriptionTable = ({
  updatedSubscriptions,
  modalOpen,
  handleModalOpen,
  setFormType,
  setSelectedRow,
}: PropsType) => {
  const [deleteSubscription] = useMutation(DELETE_SUBSCRIPTION, {
    refetchQueries: [GET_SUBSCRIPTIONS, "FetchSubscriptions"],
    client: subscription_module,
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [deleteId, setDeleteId] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = useMemo(
    () =>
      page > 0
        ? Math.max(0, (1 + page) * rowsPerPage - updatedSubscriptions?.length)
        : 0,
    [page, rowsPerPage, updatedSubscriptions]
  );
  const visibleRows = useMemo(
    () =>
      updatedSubscriptions?.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [page, rowsPerPage, updatedSubscriptions]
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
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="subscription table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell
              align="left"
              sx={{
                minWidth: "180px",
                fontSize: "0.875rem",
                fontWeight: "600",
              }}
            >
              Subscription Name
            </TableCell>
            <TableCell
              align="left"
              sx={{
                fontSize: "0.875rem",
                fontWeight: "600",
              }}
            >
              Country
            </TableCell>
            <TableCell
              align="left"
              sx={{
                fontSize: "0.875rem",
                fontWeight: "600",
              }}
            >
              Admin1s
            </TableCell>
            <TableCell
              align="left"
              sx={{ fontSize: "0.875rem", fontWeight: "600" }}
            >
              Urgency
            </TableCell>
            <TableCell
              align="left"
              sx={{ fontSize: "0.875rem", fontWeight: "600" }}
            >
              Severity
            </TableCell>
            <TableCell
              align="left"
              sx={{ fontSize: "0.875rem", fontWeight: "600" }}
            >
              Certainty
            </TableCell>
            <TableCell
              align="left"
              sx={{ fontSize: "0.875rem", fontWeight: "600" }}
            >
              Operations
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {visibleRows?.map((row: UpdatedSubscriptionItem) => (
            // <TableRow key={row.id}>

            // </TableRow>
            <CollapsibleRow
              key={row.id}
              row={row}
              handleModalOpen={handleModalOpen}
              setFormType={setFormType}
              setSelectedRow={setSelectedRow}
              setDeleteId={setDeleteId}
              setConfirmDelete={setConfirmDelete}
            />
          ))}
          {emptyRows > 0 && (
            <TableRow
              style={{
                height: 62 * emptyRows,
              }}
            >
              <TableCell colSpan={8} />
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
        count={updatedSubscriptions ? updatedSubscriptions.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog
        open={confirmDelete}
        onClose={() => {
          setConfirmDelete(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          ".MuiDialog-paper": {
            color: "transparent",
          },
        }}
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
              handleDelete(deleteId);
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
    </TableContainer>
  );
};

export default SubscriptionTable;
