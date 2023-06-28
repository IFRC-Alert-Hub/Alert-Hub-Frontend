import { Box, Collapse, IconButton, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState } from "react";

interface PropsType {
  continent: string;
}

const ContinentCollapse = ({ continent }: PropsType) => {
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <div className="subs-form-continent">
        <IconButton
          aria-label="expand row"
          size="small"
          onClick={() => setOpen(!open)}
        >
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
        <Typography variant="h6">{continent}</Typography>
      </div>
      <Collapse in={open} sx={{ ml: 4, mr: 4 }}>
        <div>Countries in {continent}</div>
      </Collapse>
    </Box>
  );
};

export default ContinentCollapse;
