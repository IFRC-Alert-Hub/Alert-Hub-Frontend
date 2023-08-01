import { Box, Button } from "@mui/material";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";

const LoginButton = () => {
  const { formatMessage } = useIntl();

  return (
    <Box padding={"6px 8px"}>
      <Link to={`/login`} style={{ textDecoration: "none", color: "inherit" }}>
        <Button
          variant="contained"
          color="success"
          disableTouchRipple
          disableRipple
          disableElevation
          disableFocusRipple
          sx={{
            color: "#fff",
            outline: "red",
            marginLeft: "8px",
            textTransform: "capitalize",
            padding: "0px ",
            borderRadius: "10px",
            backgroundColor: "#f5333f",
            "&:hover": {
              backgroundColor: "#f5333f",
            },
          }}
        >
          <Box sx={{ margin: "0 25px 0 25px" }}>
            {" "}
            {formatMessage({ id: "navbar.loginbtn" })}
          </Box>
        </Button>
      </Link>
    </Box>
  );
};

export default LoginButton;
