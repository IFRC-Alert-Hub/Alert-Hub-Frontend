import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Toolbar, Typography, IconButton, Tooltip } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { RowsData } from "./Data";

interface EnhancedTableToolbarProps {
  numSelected: number;
  selected: readonly RowsData[];
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected, selected } = props;

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
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <></>
      )}
      {numSelected > 0 ? (
        <Tooltip
          title="Download"
          onClick={(e) => {
            console.log(selected);
          }}
        >
          <IconButton>
            <FileDownloadIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <></>
      )}
    </Toolbar>
  );
};

export { EnhancedTableToolbar };
