import { Avatar, Box, Button, Tooltip } from "@mui/material";

interface User {
  id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  email: string;
  phoneNumber: string;
}

type PropsType = {
  user: User | null;
  editStatus: boolean;
  setEditStatus: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProfileAvatar = ({ user, editStatus, setEditStatus }: PropsType) => {
  const handleEdit = () => {
    setEditStatus(false);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      mt={"30px"}
    >
      <Box mb={"0.5rem"}>
        <Tooltip title="Change your avatar" arrow>
          <Button>
            <Avatar
              alt="User Name"
              src={user?.avatar}
              className="avatar-size"
            />
          </Button>
        </Tooltip>
      </Box>

      {editStatus ? (
        <Button variant="text" className="edit-btn" onClick={handleEdit}>
          Edit Profile
        </Button>
      ) : (
        <div></div>
      )}
    </Box>
  );
};

export default ProfileAvatar;
