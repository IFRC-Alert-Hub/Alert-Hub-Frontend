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
        }}
      >
        {title}:
      </span>
      <span
        style={{
          whiteSpace: "normal",
          wordWrap: "break-word",
          hyphens: "auto",
          wordBreak: "break-all",
        }}
      >
        &nbsp;{content}
      </span>
    </Typography>
  );
};
