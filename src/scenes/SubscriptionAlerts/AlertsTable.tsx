import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Menu, MenuItem, TablePagination } from "@mui/material";
import { useState } from "react";
import { SubscriptionAlertsType } from "../../API/TYPES";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Link } from "react-router-dom";
import TitleHeader from "../../components/Layout/TitleHeader";

type PropsType = {
  country: string;
  alertsData: SubscriptionAlertsType[];
};

const ITEM_HEIGHT = 48;

const AlertsTable = ({ country, alertsData }: PropsType) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [location, setLocation] = useState("All Locations");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const uniqueLocations = alertsData.reduce((locations: string[], item) => {
    item.admin1.forEach((admin1) => {
      if (!locations.includes(admin1)) {
        locations.push(admin1);
      }
    });
    return locations;
  }, []);

  const locationOptions = ["All Locations", ...uniqueLocations];

  const filteredAlerts = alertsData.filter((item) =>
    item.admin1.includes(location)
  );

  const shownData = location === "All Locations" ? alertsData : filteredAlerts;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChooseLocation = (event: any) => {
    setLocation(event.target.textContent);
    setPage(0);
    handleClose();
  };
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
    <>
      <TitleHeader title={`${country} (${shownData?.length})`} />
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
                  <div>
                    <Button
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      sx={{
                        m: 0,
                        p: 0,
                        minWidth: 0,
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "black",
                        textTransform: "capitalize",
                      }}
                      disableRipple
                      onClick={handleClick}
                      endIcon={<KeyboardArrowDownIcon />}
                    >
                      {location}
                    </Button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                      PaperProps={{
                        style: {
                          maxHeight: ITEM_HEIGHT * 4.5,
                        },
                      }}
                    >
                      {locationOptions.map((option) => (
                        <MenuItem key={option} onClick={handleChooseLocation}>
                          {option}
                        </MenuItem>
                      ))}
                    </Menu>
                  </div>
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
              {shownData
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
                      {row.admin1.join(", ")}
                    </TableCell>
                    <TableCell align="left" sx={{ fontSize: "0.875rem" }}>
                      {row.category}
                    </TableCell>
                    <TableCell align="left" sx={{ fontSize: "0.875rem" }}>
                      {row.sent}
                    </TableCell>
                    <TableCell align="left" sx={{ fontSize: "0.875rem" }}>
                      <Link
                        to={`/alerts/${row.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
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
                          View Alert Info
                        </Button>
                      </Link>{" "}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={shownData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default AlertsTable;
