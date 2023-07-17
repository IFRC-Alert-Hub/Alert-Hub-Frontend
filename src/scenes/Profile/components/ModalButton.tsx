import { Button } from "@mui/material";

type PropsType = {
  name: string;
};

const ModalButton = ({ name }: PropsType) => {
  return (
    <Button
      type="submit"
      variant="contained"
      disableElevation
      sx={{
        fontSize: "1rem",
        color: "#fff",
        backgroundColor: "#d30210",
        textTransform: "capitalize",
        width: "100%",
        "&:hover": { backgroundColor: "#d30210", opacity: "0.8" },
      }}
    >
      {name}
    </Button>
  );
};

export default ModalButton;
