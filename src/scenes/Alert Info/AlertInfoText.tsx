import * as React from "react";
import Typography from "@mui/material/Typography";

interface AlertInfoTextProps {
  title: string;
  content: string;
}

export const AlertInfoText: React.FC<AlertInfoTextProps> = (props) => {
  const { title, content } = props;
  return (
    <Typography sx={{ fontSize: "14px" }} component="div">
      <span
        style={{
          textDecoration: "underline",
          fontWeight: "bold",
          textTransform: "capitalize",
        }}
      >
        {title}:
      </span>
      <span
        style={{
          whiteSpace: "normal",
          wordWrap: "break-word",
          hyphens: "auto",
        }}
      >
        &nbsp;{content}
      </span>
    </Typography>
  );
};
