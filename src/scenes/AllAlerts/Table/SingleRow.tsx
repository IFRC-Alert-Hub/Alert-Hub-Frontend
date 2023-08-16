import {
  Box,
  Card,
  Checkbox,
  Collapse,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { AlertInfoText } from "../../Alert Info/AlertInfoText";
function modifyDateTime(timestamp: string) {
  const date = new Date(timestamp);

  const formattedDateTime = date.toLocaleString("en-US");
  return formattedDateTime;
}
interface SingleRowProps {
  handleClick?: any;
  row?: any;
  isItemSelected: boolean;
  labelId: string;
}
const SingleRow = (props: SingleRowProps) => {
  const [open, setOpen] = useState(false);

  const { handleClick, row, isItemSelected, labelId } = props;
  return (
    <>
      <TableRow
        hover
        //onClick={(event) => handleClick(event, row)}
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
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell align="center">
          <Box
            sx={{
              maxWidth: "150px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              textTransform: "capitalize",
            }}
          >
            {row.event}
          </Box>
        </TableCell>
        <TableCell align="center">
          <Box
            sx={{
              maxWidth: "150px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              textTransform: "capitalize",
            }}
          >
            {row.eventCategory}
          </Box>
        </TableCell>

        <TableCell align="center">
          <Box
            sx={{
              maxWidth: "150px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              textTransform: "capitalize",
            }}
          >
            {row.region}
          </Box>
        </TableCell>
        <TableCell align="center">{row.country}</TableCell>
        <TableCell align="center">
          <Box
            sx={{
              maxWidth: "150px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              textTransform: "capitalize",
            }}
          >
            {row.admin1s}
          </Box>
        </TableCell>

        <TableCell align="center">
          <Box
            sx={{
              maxWidth: "150px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              textTransform: "capitalize",
            }}
          >
            {modifyDateTime(row.sent)}
          </Box>
        </TableCell>

        <TableCell align="center">
          <Box
            sx={{
              maxWidth: "150px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              textTransform: "capitalize",
            }}
          >
            {" "}
            <Link
              to={`/alerts/${row.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Details
            </Link>{" "}
          </Box>
        </TableCell>

        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            checked={isItemSelected}
            inputProps={{
              "aria-labelledby": labelId,
            }}
            onChange={(event) => {
              event.stopPropagation(); // Prevent the click event from reaching the parent elements
              handleClick(event, row); // Call your handleClick function with the specific row
            }}
          />
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ mt: 0, ml: 2, mr: 2, mb: 2 }} padding={"20px"}>
              <Typography
                variant="h5"
                gutterBottom
                component="div"
                sx={{ fontWeight: 600, mb: 1 }}
              >
                Alert Details
              </Typography>
              <AlertInfoText
                title="Identifier"
                content={row.identifier}
              ></AlertInfoText>
              <AlertInfoText title="Event" content={row.event}></AlertInfoText>
              <AlertInfoText
                title="Event Category"
                content={row.eventCategory}
              ></AlertInfoText>
              <AlertInfoText
                title="Region"
                content={row.region}
              ></AlertInfoText>
              <AlertInfoText
                title="Country"
                content={row.country}
              ></AlertInfoText>
              <AlertInfoText
                title="Admin1s"
                content={row.admin1s}
              ></AlertInfoText>
              <AlertInfoText title="Sent" content={row.sent}></AlertInfoText>
              <AlertInfoText
                title="Sender"
                content={row.sender}
              ></AlertInfoText>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default SingleRow;
