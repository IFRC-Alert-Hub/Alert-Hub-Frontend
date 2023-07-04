import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

const LoginButton = () => {
  return (
    <>
      <Link to={`/login`} style={{ textDecoration: "none", color: "inherit" }}>
        <Button
          variant="contained"
          color="success"
          disableTouchRipple
          sx={{
            color: "#fff",
            outline: "red",
            marginLeft: "20px",
            textTransform: "capitalize",
            padding: "0px ",
            borderRadius: "10px",
            backgroundColor: "#f5333f",
            "&:hover": {
              backgroundColor: "#f5333f",
            },
          }}
        >
          <Box sx={{ margin: "0 50px 0 50px" }}>Login</Box>
        </Button>
      </Link>
    </>
  );
};

export default LoginButton;
