import { Avatar, Box, Button } from "@mui/material";

interface UserType {
  id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
}

type PropsType = {
  user: UserType;
  editStatus: boolean;
  setEditStatus: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProfileAvatar = ({ user, editStatus, setEditStatus }: PropsType) => {
  const handleEdit = () => {
    setEditStatus(false);
  };

  return (
    <Box
      marginTop="30px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Avatar alt="User Name" src={user.avatar} className="avatar-size" />
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
