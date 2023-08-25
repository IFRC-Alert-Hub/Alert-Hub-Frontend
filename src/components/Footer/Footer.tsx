import { Box, Button, Container, Grid, Link, Typography } from "@mui/material";
import "../../index.css";
import { useIntl } from "react-intl";

const Footer = () => {
  const { formatMessage } = useIntl();

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
              {formatMessage({ id: "footer.title" })}
            </Typography>
            <Typography
              variant="h6"
              component="div"
              color="white"
              fontWeight={500}
            >
              {formatMessage({ id: "footer.aims" })}
            </Typography>
            <Typography variant="subtitle1" color={"rgb(145, 145, 145)"}>
              {formatMessage({ id: "footer.copyright" })}
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
              {formatMessage({ id: "footer.findOutMore" })}
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
                {formatMessage({ id: "footer.IFRC" })}
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
                {formatMessage({ id: "footer.rcrcsims" })}
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
                {formatMessage({ id: "footer.data.ifrc" })}
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
              {formatMessage({ id: "footer.helpfulLinks" })}
            </Typography>

            <Link
              href="https://github.com/IFRC-Alert-Hub/"
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
                {formatMessage({ id: "footer.sourceCode" })}
              </Typography>
            </Link>
            <Link
              className="footer-section-link"
              target="_blank"
              underline="hover"
              href="https://github.com/IFRC-Alert-Hub/Alert-Hub-Alert-Manager#api-documentation"
            >
              <Typography
                variant="h6"
                color="white"
                sx={{ textDecoration: "underline" }}
                margin={"0 0 12px"}
                fontWeight={300}
              >
                {formatMessage({ id: "footer.API" })}
              </Typography>
            </Link>
            <Link
              href="/resources"
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
                {formatMessage({ id: "footer.otherResources" })}
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
              {formatMessage({ id: "footer.contactUs" })}
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
