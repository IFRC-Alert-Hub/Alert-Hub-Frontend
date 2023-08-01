import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";

const HomeSubscriptionCard = () => {
  const { formatMessage } = useIntl();

  return (
    <Grid container spacing={2} sx={{ alignItems: "stretch" }}>
      <Grid
        item
        sm={12}
        md={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card sx={{ display: "flex", maxWidth: "500px", mb: 4 }}>
          <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <CardContent sx={{ flex: "1 0 auto", p: 3 }}>
              <Typography component="div" variant="h4" sx={{ fontWeight: 600 }}>
                {formatMessage({ id: "home.heroCard.title1" })}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
                mt={1}
                sx={{ lineHeight: 1.5 }}
              >
                {formatMessage({ id: "home.heroCard.subtitle1" })}
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
                  {formatMessage({ id: "home.heroCard.btnTitle1" })}{" "}
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
              image="/assets/home/AlertHub.jpg"
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
                {formatMessage({ id: "home.heroCard.title2" })}{" "}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
                mt={1}
                sx={{ lineHeight: 1.5 }}
              >
                {formatMessage({ id: "home.heroCard.subtitle2" })}
              </Typography>
            </CardContent>
            <Box sx={{ display: "flex", alignItems: "center", pl: 3, pb: 3 }}>
              <Link to="/">
                <Button
                  color="error"
                  variant="outlined"
                  sx={{ borderRadius: "20px", textTransform: "capitalize" }}
                >
                  {formatMessage({ id: "home.heroCard.btnTitle2" })}
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
              image="/assets/home/api1.png"
              alt="subscription logo"
            />
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

export default HomeSubscriptionCard;
