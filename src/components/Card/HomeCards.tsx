import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const HomeSubscriptionCard = () => {
  return (
    <Grid container spacing={2}>
      <Grid
        item
        sm={12}
        md={6}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Card sx={{ display: "flex", maxWidth: "500px", mb: 4 }}>
          <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <CardContent sx={{ flex: "1 0 auto", p: 3 }}>
              <Typography component="div" variant="h4" sx={{ fontWeight: 600 }}>
                Add subscription to receive alerts in time
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
                mt={1}
                sx={{ lineHeight: 1.5 }}
              >
                With real-time monitoring of potential risks and emergency
                events, receive timely and accurate alerts.
              </Typography>
            </CardContent>
            <Box sx={{ display: "flex", alignItems: "center", pl: 3, pb: 3 }}>
              <Link to="/account/subscription">
                <Button
                  color="error"
                  variant="contained"
                  disableElevation
                  sx={{ borderRadius: "20px", textTransform: "capitalize" }}
                >
                  Subscribe Alerts
                </Button>
              </Link>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              pr: 3,
            }}
          >
            <CardMedia
              component="img"
              sx={{ width: 150 }}
              image="/home/AlertHub.jpg"
              alt="subscription logo"
            />
          </Box>
        </Card>
      </Grid>
      <Grid
        item
        sm={12}
        md={6}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Card sx={{ display: "flex", maxWidth: "500px", mb: 4 }}>
          <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <CardContent sx={{ flex: "1 0 auto", p: 3 }}>
              <Typography component="div" variant="h4" sx={{ fontWeight: 600 }}>
                Use API to rebroadcast CAP alerts
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
                mt={1}
                sx={{ lineHeight: 1.5 }}
              >
                With simple yet powerful API endpoints, you can tailor the
                alerts to suit your users' needs.
              </Typography>
            </CardContent>
            <Box sx={{ display: "flex", alignItems: "center", pl: 3, pb: 3 }}>
              <Link to="/">
                <Button
                  color="error"
                  variant="outlined"
                  sx={{ borderRadius: "20px", textTransform: "capitalize" }}
                >
                  API Reference
                </Button>
              </Link>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              pr: 3,
            }}
          >
            <CardMedia
              component="img"
              sx={{ width: 150 }}
              image="/home/api1.png"
              alt="subscription logo"
            />
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

export default HomeSubscriptionCard;
