import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

export interface IDropdownItems {
  name: string;
  path: string;
  exact: boolean;
}

const CustomNavItemDropdown = (props: {
  NavItemTitle: string;
  DropdownItems: IDropdownItems[];
}) => {
  const location = useLocation();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (option: string) => {
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        disableRipple
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon sx={{ color: "#f5333f" }} />}
        sx={{
          padding: "0px",
          borderRadius: "0px",
          borderBottom: "1px solid transparent",
          ...(props.DropdownItems.some(
            (item) => item.path === location.pathname
          ) && {
            borderBottomColor: "#f5333f",
            paddingBottom: "2px",
            marginBottom: "-2px",
          }),
          "&:hover": { backgroundColor: "transparent !important" },
          "&:focus": { backgroundColor: "transparent !important" },
        }}
      >
        <Typography variant="h6" textTransform={"capitalize"}>
          {props.DropdownItems.some((item) => item.path === location.pathname)
            ? props.DropdownItems.find(
                (item) => item.path === location.pathname
              )?.name
            : props.NavItemTitle}
        </Typography>
      </Button>
      <Menu
        elevation={0}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        id="demo-customized-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {props.DropdownItems.map((item) => (
          <Link
            to={item.path}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuItem
              onClick={() => handleMenuItemClick(item.name)}
              disableRipple
            >
              {item.name}
            </MenuItem>
          </Link>
        ))}
      </Menu>
    </>
  );
};

export default CustomNavItemDropdown;
