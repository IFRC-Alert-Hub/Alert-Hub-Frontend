import { Box, Button, Container, Grid, Link, Typography } from "@mui/material";
import "../index.css";

const Footer = () => {
  return (
    <footer className="footer">
      <Container maxWidth="lg">
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={3}>
            <Typography
              variant="h4"
              component="div"
              color="white"
              fontWeight={600}
              letterSpacing={"1.6px"}
              margin={"0 0 24px"}
              textTransform={"uppercase"}
            >
              About Alert Hub
            </Typography>
            <Typography
              variant="h6"
              component="div"
              color="white"
              fontWeight={500}
            >
              The aim of IFRC Alert Hub is to provide timely and effective
              emergency alerts to communities worldwide, empowering them to
              protect their lives and livelihoods.
            </Typography>
            <Typography variant="subtitle1" color={"rgb(145, 145, 145)"}>
              © IFRC Alert Hub 2023 v1
            </Typography>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography
              variant="h4"
              component="div"
              color="white"
              fontWeight={600}
              letterSpacing={"1.6px"}
              margin={"0 0 24px"}
              textTransform={"uppercase"}
            >
              Find Out More
            </Typography>
            <Link
              href="https://ifrc.org"
              className="footer-section-link"
              target="_blank"
              underline="hover"
            >
              <Typography
                variant="h6"
                color="white"
                sx={{ textDecoration: "underline" }}
                margin={"0 0 12px"}
                fontWeight={300}
              >
                ifrc.org
              </Typography>
            </Link>
            <Link
              href="https://ifrc.org"
              className="footer-section-link"
              target="_blank"
              underline="hover"
            >
              <Typography
                variant="h6"
                color="white"
                sx={{ textDecoration: "underline" }}
                margin={"0 0 12px"}
                fontWeight={300}
              >
                rcrcsims.org
              </Typography>
            </Link>
            <Link
              href="https://ifrc.org"
              className="footer-section-link"
              target="_blank"
              underline="hover"
            >
              <Typography
                variant="h6"
                color="white"
                sx={{ textDecoration: "underline" }}
                margin={"0 0 12px"}
                fontWeight={300}
              >
                data.ifrc.org
              </Typography>
            </Link>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography
              variant="h4"
              component="div"
              color="white"
              fontWeight={600}
              letterSpacing={"1.6px"}
              margin={"0 0 24px"}
              textTransform={"uppercase"}
            >
              Helpful Links
            </Typography>

            <Link
              href="https://github.com/ifrcgo/go-frontend"
              target="_blank"
              underline="hover"
            >
              <Typography
                variant="h6"
                color="white"
                sx={{ textDecoration: "underline" }}
                margin={"0 0 12px"}
                fontWeight={300}
              >
                Open Source Code
              </Typography>
            </Link>
            <Link
              className="footer-section-link"
              target="_blank"
              underline="hover"
            >
              <Typography
                variant="h6"
                color="white"
                sx={{ textDecoration: "underline" }}
                margin={"0 0 12px"}
                fontWeight={300}
              >
                API Documentation
              </Typography>
            </Link>
            <Link
              href="/about"
              className="footer-section-link"
              underline="hover"
            >
              <Typography
                variant="h6"
                color="white"
                sx={{ textDecoration: "underline" }}
                margin={"0 0 12px"}
                fontWeight={300}
              >
                Other Resources
              </Typography>
            </Link>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography
              variant="h4"
              component="div"
              color="white"
              fontWeight={600}
              letterSpacing={"1.6px"}
              margin={"0 0 24px"}
              textTransform={"uppercase"}
            >
              CONTACT US
            </Typography>
            <Link
              href="mailto:im@ifrc.org"
              className="button button--primary-filled button--small button-footer-contact"
            >
              <Button
                variant="contained"
                color="success"
                disableTouchRipple
                sx={{
                  color: "#fff",
                  outline: "red",
                  padding: "0px ",
                  borderRadius: "25px",
                  backgroundColor: "#f5333f",
                  "&:hover": {
                    backgroundColor: "#f5333f",
                  },
                  textTransform: "lowercase",
                }}
              >
                <Typography
                  color="white"
                  variant={"h6"}
                  sx={{ margin: "4px 36px 4px 36px" }}
                >
                  im@ifrc.org
                </Typography>
              </Button>
            </Link>

            <Box>
              <Link
                href="https://ifrcgoproject.medium.com"
                className="footer-social-each"
                target="_blank"
                underline="none"
              >
                <span className="f-icon-medium footer-social-icon"></span>
              </Link>
              <Link
                href="https://www.facebook.com/IFRC"
                className="footer-social-each"
                target="_blank"
                underline="none"
              >
                <span className="f-icon-facebook footer-social-icon"></span>
              </Link>
              <Link
                href="https://twitter.com/ifrcgo"
                className="footer-social-each"
                target="_blank"
                underline="none"
              >
                <span className="f-icon-twitter footer-social-icon"></span>
              </Link>
              <Link
                href="https://www.youtube.com/watch?v=dwPsQzla9A4"
                className="footer-social-each"
                target="_blank"
                underline="none"
              >
                <span className="f-icon-youtube footer-social-icon"></span>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
