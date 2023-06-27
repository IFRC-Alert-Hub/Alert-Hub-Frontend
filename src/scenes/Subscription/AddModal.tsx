import { Box, Modal, Typography } from "@mui/material";
import ModalForm from "./ModalForm";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  minWidth: "350px",
  maxHeight: "500px",
  overflow: "auto",
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
        <Typography id="modal-title" variant="h3" fontWeight={"bold"} mb="5px">
          Add New Subscription
        </Typography>
        <ModalForm open={open} handleClose={handleClose} />
      </Box>
    </Modal>
  );
};

export default AddModal;
