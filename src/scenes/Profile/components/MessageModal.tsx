import { Box, Modal, Typography } from "@mui/material";
import { User } from "../../../context/UserContext";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 480,
  bgcolor: "background.paper",
  boxShadow: 20,
  borderRadius: 1,
};

type PropsType = {
  user?: User;
  header: string;
  children: React.ReactNode;
  open: boolean;
  handleClose: () => void;
};

const MessageModal = ({ header, children, open, handleClose }: PropsType) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              textAlign: "center",
              backgroundColor: "#d30210",
              p: 1.5,
              borderRadius: "4px 4px 0 0",
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ fontSize: "1.2rem", color: "#fff" }}
            >
              {header}
            </Typography>
          </Box>
          <Box p={4}>{children}</Box>
        </Box>
      </Modal>
    </div>
  );
};

export default MessageModal;
