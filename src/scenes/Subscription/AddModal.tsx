import { Box, Modal, Typography } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  minWidth: "350px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
};

type PropsType = {
  open: boolean;
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddModal = ({ open, handleClose }: PropsType) => {
  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
      <Box sx={style}>
        <Typography id="modal-title" variant="h6" fontWeight={"bold"}>
          Add New Subscription
        </Typography>
        <Box>form content</Box>
      </Box>
    </Modal>
  );
};

export default AddModal;
