import { Avatar, Box, Button } from "@mui/material";

const ProfileAvatar = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Avatar
        alt="User Name"
        src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
        className="avatar-size"
      />
      <Button variant="text" className="edit-btn">
        Edit Profile
      </Button>
    </Box>
  );
};

export default ProfileAvatar;
