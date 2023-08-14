import React, { useState } from "react";
import {
  Box,
  Button,
  Collapse,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { SubscriptionForm, UpdatedSubscriptionItem } from "../../../API/TYPES";
import { useNavigate } from "react-router-dom";

type PropsType = {
  row: UpdatedSubscriptionItem;
  handleModalOpen: () => void;
  setFormType: React.Dispatch<React.SetStateAction<string>>;
  setSelectedRow: React.Dispatch<React.SetStateAction<SubscriptionForm>>;
  setDeleteId: React.Dispatch<React.SetStateAction<string>>;
  setConfirmDelete: React.Dispatch<React.SetStateAction<boolean>>;
};

const CollapsibleRow = ({
  row,
  handleModalOpen,
  setFormType,
  setSelectedRow,
  setDeleteId,
  setConfirmDelete,
}: PropsType) => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleViewAlerts = () => {
    navigate(
      `/account/subscription/${row.id}/${row.subscriptionName}/${row.countryNames[0]}`
    );
  };

  return (
    <>
      <TableRow sx={{ "& td": { borderBottom: 0 } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left" sx={{ fontSize: "0.875rem" }}>
          <Box
            sx={{
              maxWidth: "150px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              textTransform: "capitalize",
            }}
          >
            {row.subscriptionName}
          </Box>
        </TableCell>
        <TableCell align="left" sx={{ fontSize: "0.875rem" }}>
          <Box
            sx={{
              width: "100px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {row.countryNames[0]}
          </Box>
        </TableCell>
        <TableCell align="left" sx={{ fontSize: "0.875rem" }}>
          <Box
            sx={{
              width: "100px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {row.admin1Names.join(", ")}
          </Box>
        </TableCell>
        <TableCell align="left" sx={{ fontSize: "0.875rem" }}>
          <Box
            sx={{
              maxWidth: "100px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {row.urgencyArray.join(", ")}
          </Box>
        </TableCell>
        <TableCell align="left" sx={{ fontSize: "0.875rem" }}>
          <Box
            sx={{
              maxWidth: "100px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {row.severityArray.join(", ")}
          </Box>
        </TableCell>
        <TableCell align="left" sx={{ fontSize: "0.875rem" }}>
          <Box
            sx={{
              maxWidth: "100px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {row.certaintyArray.join(", ")}
          </Box>
        </TableCell>
        <TableCell align="left" sx={{ minWidth: "180px" }}>
          <Button
            variant="text"
            disableRipple
            onClick={handleViewAlerts}
            sx={{
              color: "red",
              minWidth: 0,
              textTransform: "capitalize",
              mr: "1rem",
              p: 0,
              fontSize: "0.875rem",
              "&:hover": {
                opacity: "0.7",
              },
            }}
          >
            View
          </Button>
          <Button
            variant="text"
            size="small"
            onClick={() => {
              handleModalOpen();
              setFormType("Edit");
              setSelectedRow({
                id: row.id,
                subscriptionName: row.subscriptionName,
                countryIds: row.countryIds,
                admin1Ids: row.admin1Ids,
                urgencyArray: row.urgencyArray,
                severityArray: row.severityArray,
                certaintyArray: row.certaintyArray,
                subscribeBy: row.subscribeBy,
                sentFlag: row.sentFlag,
              });
            }}
            sx={{
              color: "red",
              minWidth: 0,
              textTransform: "capitalize",
              mr: "1rem",
              p: 0,
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
            onClick={() => {
              setConfirmDelete(true);
              setDeleteId(row.id);
            }}
            sx={{
              color: "red",
              minWidth: 0,
              textTransform: "capitalize",
              p: 0,
              fontSize: "0.875rem",
              "&:hover": {
                opacity: "0.7",
              },
            }}
          >
            Delete
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ mt: 0, ml: 2, mr: 2, mb: 2 }}>
              <Typography
                variant="h5"
                gutterBottom
                component="div"
                sx={{ fontWeight: 600, mb: 1 }}
              >
                Subscription Detail
              </Typography>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                sx={{ fontWeight: 400 }}
              >
                <span style={{ color: "gray" }}>Title:</span>{" "}
                {row.subscriptionName}
              </Typography>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                sx={{ fontWeight: 400 }}
              >
                <span style={{ color: "gray" }}>Subscribed Country:</span>{" "}
                {row.countryNames[0]}
              </Typography>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                sx={{ fontWeight: 400 }}
              >
                <span style={{ color: "gray" }}>Subscribed Admin1s:</span>{" "}
                {row.admin1Names.join(", ")}
              </Typography>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                sx={{ fontWeight: 400 }}
              >
                <span style={{ color: "gray" }}>Urgency:</span>{" "}
                {row.urgencyArray.join(", ")}
              </Typography>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                sx={{ fontWeight: 400 }}
              >
                <span style={{ color: "gray" }}>Severity:</span>{" "}
                {row.severityArray.join(", ")}
              </Typography>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                sx={{ fontWeight: 400 }}
              >
                <span style={{ color: "gray" }}>Certainty:</span>{" "}
                {row.certaintyArray.join(", ")}
              </Typography>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                sx={{ fontWeight: 400 }}
              >
                <span style={{ color: "gray" }}>Notification Methods:</span>{" "}
                {row.subscribeBy.join(", ")}
              </Typography>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                sx={{ fontWeight: 400 }}
              >
                <span style={{ color: "gray" }}>Send Interval:</span>{" "}
                {row.sentFlagName}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default CollapsibleRow;
