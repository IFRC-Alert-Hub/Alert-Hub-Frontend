import { useMutation } from "@apollo/client";
import { AccountBox, Checklist, Logout } from "@mui/icons-material";
import {
  Avatar,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth_system } from "../../GraphQL API/API_Links";
import { LOGOUT } from "../../GraphQL API/mutations/authMutations";
import { UserContext } from "../../context/UserContext";

const AvatarDropdown = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  const [logoutData] = useMutation(LOGOUT, {
    client: auth_system,
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = async () => {
    try {
      const result = await logoutData();
      if (result.data.logout.success) {
        console.log("logout, token deleted");
      } else {
        console.log("error");
      }
      return result;
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    logoutHandler();
    navigate("/");
    userContext.setUser(null);
    window.location.reload();
  };

  return (
    <>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 1 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar
            alt="User Name"
            src={userContext.user?.avatar}
            sx={{ width: 32, height: 32 }}
          />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Link to={"/account/profile"} className="avatar-btn-link">
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <AccountBox fontSize="small" />
            </ListItemIcon>
            My Profile
          </MenuItem>
        </Link>
        <Link to={"/account/subscription"} className="avatar-btn-link">
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Checklist fontSize="small" />
            </ListItemIcon>
            My Subscriptions
          </MenuItem>
        </Link>
        <MenuItem onClick={handleLogout}>
          {" "}
          {/* Add onClick handler */}
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default AvatarDropdown;
