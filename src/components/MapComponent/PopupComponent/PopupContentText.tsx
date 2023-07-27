import * as React from "react";
import Typography from "@mui/material/Typography";

interface PopupContentTextProps {
  title: string;
  content: string;
}

export const PopupContentText: React.FC<PopupContentTextProps> = (props) => {
  const { title, content } = props;
  return (
    <Typography variant="body2" component="div">
      <span
        style={{
          textTransform: "capitalize",
          textDecoration: "underline",
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
