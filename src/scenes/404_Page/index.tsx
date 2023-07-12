import { Box, Button, Container, Link, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const PageNotFound = () => {
  return (
    <>
      <Container maxWidth="lg" sx={{ textAlign: "center", padding: "30px" }}>
        <Box>
          {" "}
          <SearchIcon
            className="shaking_icon"
            sx={{ fontSize: "80px" }}
          ></SearchIcon>
        </Box>

        <Typography
          variant="h2"
          fontSize={"48px"}
          fontWeight={"600"}
          paddingBottom={"30px"}
        >
          Page not found
        </Typography>
        <Typography variant="h5" fontWeight={"500"} paddingBottom={"30px"}>
          The requested page does not exist or may have been removed.
        </Typography>

        <Box sx={{ paddingBottom: "30px" }}>
          <Typography
            variant="h6"
            fontWeight={"500"}
            color={"rgba(0, 0, 0, 0.7)"}
          >
            Are you sure the URL is correct?
          </Typography>
          <Typography
            variant="h6"
            fontWeight={"500"}
            color={"rgba(0, 0, 0, 0.7)"}
          >
            <Link
              sx={{ color: "black", textDecoration: "underline" }}
              href="mailto:im@ifrc.org"
            >
              Get in touch
            </Link>{" "}
            with the platform team.
          </Typography>
        </Box>

        <Button
          type="submit"
          variant="contained"
          sx={{
            color: "#fff",
            outline: "red",
            textTransform: "capitalize",
            padding: "0.25rem 0.75rem",
            borderRadius: "20px",
            backgroundColor: "#f5333f",
            "&:hover": {
              backgroundColor: "#f5333f",
            },
            fontSize: "16px",
            fontWeight: "700",
          }}
          href="/"
        >
          Expore our Homepage
        </Button>
      </Container>
    </>
  );
};

export default PageNotFound;
