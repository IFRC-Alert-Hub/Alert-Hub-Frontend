import { Box, Grid, Typography } from "@mui/material";
import PageTitle from "../PageTitle";
import { ReactNode } from "react";

interface AuthComponentProps {
  pageTitle: string;
  authTitle: string;
  authSubtitle?: string;
  formComponent: ReactNode;
}
const AuthComponent: React.FC<AuthComponentProps> = ({
  pageTitle,
  authTitle,
  authSubtitle,
  formComponent,
}) => {
  return (
    <>
      {" "}
      <PageTitle title={pageTitle}></PageTitle>
      <Grid
        container
        component="main"
        sx={{
          height: "auto",
          borderRadius: "20px",
          justify: "flex-end",
          alignItems: "center",
        }}
      >
        <Grid item xs={12} sm={12} md={6}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
              borderRadius: "20px",
              padding: "2rem",
              minHeight: "auto",
              textAlign: "center",
            }}
          >
            <Typography
              component="h1"
              variant="h2"
              fontWeight={560}
              textAlign={"center"}
              fontSize={"23px"}
            >
              {authTitle}
            </Typography>
            <Typography
              variant="h5"
              fontSize={"12px"}
              textAlign={"center"}
              color={"#444850"}
              padding="0 10px"
              marginBottom="3px"
            >
              {authSubtitle}
            </Typography>
            {formComponent}
          </Box>
        </Grid>
        <Grid
          item
          display={{ xs: "none", sm: "none", md: "block" }}
          md={6}
          sx={{
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <img
            src={process.env.PUBLIC_URL + "/assets/login_ifrc.png"}
            alt="ifrc_image"
            style={{
              width: "80%",
              height: "auto",
              borderRadius: "20px",
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default AuthComponent;
