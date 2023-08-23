import { Button, Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

type PropsType = {
  title: string;
  content: string;
  link: string;
};

const Resourcecard = ({ title, content, link }: PropsType) => {
  return (
    <Card variant="outlined" sx={{ mb: "1rem", borderRadius: 5 }}>
      <CardContent sx={{ pb: "1rem !important" }}>
        <Typography variant="h3" fontWeight={600} component="div">
          {title}
        </Typography>
        <Typography variant="h6" my={"1rem"} sx={{ fontWeight: 400 }}>
          {content}
        </Typography>
        <Link to={link} target="_blank">
          <Button
            size="small"
            color="error"
            sx={{
              p: 0,
              fontSize: "15px",
              fontWeight: 400,
              textTransform: "capitalize",
              "&:hover": {
                textDecoration: "underline",
                backgroundColor: "transparent",
              },
            }}
          >
            Learn more
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default Resourcecard;
