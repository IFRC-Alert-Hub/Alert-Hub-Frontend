import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

type PropsType = {
  title: string;
};

const AlertCard = ({ title }: PropsType) => {
  const navigate = useNavigate();

  const handleViewAlerts = () => {
    navigate(`/account/subscription/${title}`);
  };

  return (
    <Card sx={{ flex: "0 0 300px", mr: 3, mb: 3 }}>
      <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ fontWeight: 600 }}
            textTransform="capitalize"
          >
            {title}
          </Typography>
          <Typography variant="body2">Current Alerts: 10</Typography>
          <Typography variant="body2" color="text.secondary">
            Last updated: July 8, 2023
          </Typography>
        </Box>
        <Box>
          <Button
            variant="text"
            disableRipple
            onClick={handleViewAlerts}
            sx={{
              color: "red",
              minWidth: 0,
              textTransform: "capitalize",
              p: "0 5px 0 0",
              fontSize: "0.875rem",
              "&:hover": {
                opacity: "0.7",
              },
            }}
          >
            View
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AlertCard;
