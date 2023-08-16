import FileDownloadIcon from "@mui/icons-material/FileDownload";
import {
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  Chip,
  Menu,
  MenuItem,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { RowsData } from "./Data";
import { useState } from "react";
import { utils, write } from "xlsx";

interface EnhancedTableToolbarProps {
  numSelected: number;
  selected: readonly RowsData[];
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const { numSelected, selected } = props;
  const downloadCSV = () => {
    const headers = Object.keys(selected[0]);

    const csvContent = [
      headers.join(","),
      ...selected.map((row) => headers.map((header) => row[header]).join(",")),
    ].join("\n");

    const csvData =
      "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent);

    const link = document.createElement("a");
    link.setAttribute("href", csvData);
    link.setAttribute("download", "output.csv");
    link.style.display = "none";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadExcel = () => {
    const headers = Object.keys(selected[0]);

    const data = [
      headers,
      ...selected.map((row) => headers.map((header) => row[header])),
    ];

    const ws = utils.aoa_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Sheet1");

    const blob = new Blob([write(wb, { bookType: "xlsx", type: "array" })], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "output.xlsx";
    link.style.display = "none";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        color="inherit"
        variant="subtitle1"
        component="div"
      >
        {numSelected} selected
      </Typography>
      <Typography>
        <Chip label="Select multiple alerts to download as a csv" />
      </Typography>
      <div>
        <Tooltip title="Download">
          <IconButton disabled={numSelected === 0} onClick={handleMenuOpen}>
            <FileDownloadIcon />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={downloadCSV}>Download as CSV</MenuItem>
          <MenuItem onClick={downloadExcel}>Download as Excel</MenuItem>
        </Menu>
      </div>
    </Toolbar>
  );
};

export { EnhancedTableToolbar };
