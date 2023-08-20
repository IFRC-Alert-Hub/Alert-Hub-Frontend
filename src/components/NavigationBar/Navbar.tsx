import {
  AppBar,
  Toolbar,
  Container,
  Typography,
  Hidden,
  IconButton,
  Avatar,
  Box,
  Button,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemText,
  Drawer,
  Collapse,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation } from "react-router-dom";
import CustomNavItemDropdown from "./CustomNavItemDropdown";

import LoginButton from "./LoginButton";
import TimeComponent from "./TimeComponent";
import { useContext, useState } from "react";
import AvatarDropdown from "./AvatarDropdown";
import ChangeLanguageDropdown from "./ChangeLanguageDropdown";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { UserContext } from "../../context/UserContext";
import NavItems from "./NavItemItems";
import { useIntl } from "react-intl";

const NavbarComponent = (props: any) => {
  const { formatMessage } = useIntl();
  const userContext = useContext(UserContext);
  const { RegionsDropdownItems, firstNavBarItems, secondNavBarItems } =
    NavItems();
  const location = useLocation();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileRegion, setOpenMobileRegion] = useState(false);

  const handleClick = () => {
    setOpenMobileRegion(!openMobileRegion);
  };
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
    setOpenMobileRegion(false);
  };

  const drawer = (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Alert Hub
      </Typography>
      <Divider />
      <List>
        {secondNavBarItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItem disablePadding>
              <ListItemButton onClick={handleDrawerToggle}>
                <ListItemText primary={item.name}>{item.name}</ListItemText>
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
        <ListItemButton onClick={handleClick}>
          <ListItemText primary="Regions" />
          {openMobileRegion ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openMobileRegion} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {RegionsDropdownItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ListItem disablePadding>
                  <ListItemButton onClick={handleDrawerToggle} sx={{ pl: 4 }}>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
        </Collapse>
        {firstNavBarItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItem disablePadding>
              <ListItemButton onClick={handleDrawerToggle}>
                <ListItemText primary={item.name}>{item.name}</ListItemText>
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className="header">
      <AppBar position="static" sx={{ backgroundColor: "#E6E7EB" }}>
        <Toolbar
          sx={{
            minHeight: "fit-content !important",
            padding: "0px !important",
          }}
        >
          <Container maxWidth="md">
            <TimeComponent />
          </Container>
        </Toolbar>
      </AppBar>

      <AppBar
        position="static"
        color="primary"
        sx={{ borderBottom: "2px solid #f5333f" }}
      >
        <Container maxWidth="lg">
          <Toolbar
            sx={{
              paddingLeft: "0px !important",
              paddingRight: "0px !important",
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                mr: 2,
                display: { sm: "none" },
              }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ flexGrow: { xs: 1, sm: 0 } }}>
              <Link
                to={"/"}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Avatar
                  alt="logo"
                  src={process.env.PUBLIC_URL + "/assets/go-logo-2020.svg"}
                  sx={{
                    verticalAlign: "middle",
                    height: "2.2rem",
                    width: "6.25rem",
                  }}
                  variant="square"
                />
              </Link>
            </Box>

            <Typography
              variant="h6"
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "inline" },
              }}
              fontWeight={"bold"}
              fontSize={"20px"}
            >
              <Link
                to={"/"}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                ALERT HUB
              </Link>
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ChangeLanguageDropdown />
              <Box sx={{ display: { xs: "none", sm: "inline" } }}>
                {firstNavBarItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Button
                      key={item.name}
                      sx={{
                        padding: "6px 0.5rem",
                        textTransform: "capitalize",
                        paddingRight: "15px",
                      }}
                      disableRipple
                      disableTouchRipple
                      disableFocusRipple
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          borderBottom: "1px solid transparent",
                          ...(location.pathname === item.path && {
                            borderBottomColor: "#f5333f",
                            paddingBottom: "2px",
                            marginBottom: "-2px",
                          }),
                        }}
                      >
                        {item.name}
                      </Typography>
                    </Button>
                  </Link>
                ))}
              </Box>
              {userContext.user ? <AvatarDropdown /> : <LoginButton />}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Hidden smDown>
        <AppBar position="static" color="primary">
          <Container maxWidth="lg">
            <Toolbar sx={{ padding: "0px !important" }}>
              <Box>
                {secondNavBarItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Button
                      key={item.name}
                      sx={{
                        padding: "0 40px 0 0",
                        textTransform: "capitalize",
                      }}
                      disableRipple
                      disableTouchRipple
                      disableFocusRipple
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          borderBottom: "1px solid transparent",
                          ...(location.pathname === item.path && {
                            borderBottomColor: "#f5333f",
                            paddingBottom: "2px",
                            marginBottom: "-2px",
                          }),
                        }}
                      >
                        {item.name}
                      </Typography>
                    </Button>
                  </Link>
                ))}
                <CustomNavItemDropdown
                  NavItemTitle={formatMessage({ id: "navbar.regions" })}
                  DropdownItems={RegionsDropdownItems}
                />

                <Link
                  key={"subscription"}
                  to={"/account/subscription"}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Button
                    key={"subscription"}
                    sx={{
                      padding: "0 40px 0 0",
                      textTransform: "capitalize",
                    }}
                    disableRipple
                    disableTouchRipple
                    disableFocusRipple
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        borderBottom: "1px solid transparent",
                        ...(location.pathname === "/account/subscription" && {
                          borderBottomColor: "#f5333f",
                          paddingBottom: "2px",
                          marginBottom: "-2px",
                        }),
                      }}
                    >
                      {formatMessage({ id: "navbar.mySubscriptions" })}
                    </Typography>
                  </Button>
                </Link>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Hidden>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: "240px",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </div>
  );
};

export default NavbarComponent;
