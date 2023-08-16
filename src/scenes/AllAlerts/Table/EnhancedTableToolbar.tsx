import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Toolbar, Typography, IconButton, Tooltip, Chip } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { RowsData } from "./Data";

interface EnhancedTableToolbarProps {
  numSelected: number;
  selected: readonly RowsData[];
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected, selected } = props;
  function downloadCSV() {
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
  }
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
      <Tooltip title="Download" onClick={downloadCSV}>
        <IconButton disabled={numSelected === 0}>
          <FileDownloadIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

export { EnhancedTableToolbar };
