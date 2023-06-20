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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation } from "react-router-dom";
import CustomNavItemDropdown from "./CustomNavItemDropdown";
import {
  UrgencyLevelDropdownItems,
  HazardTypeDropdownItems,
  RegionsDropdownItems,
  firstNavBarItems,
  secondNavBarItems,
} from "./NavItemItems";
import RoundButton from "./../../RoundButton";
import TimeComponent from "./TimeComponent";
import { useState } from "react";
import "../../../index.css";

const NavbarComponent = (props: any) => {
  const location = useLocation();

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Alert Hub
      </Typography>
      <Divider />
      <List>
        {firstNavBarItems.map((item) => (
          <Link
            to={item.path}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItem key={item.name} disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary={item.name}>{item.name}</ListItemText>
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
        {secondNavBarItems.map((item) => (
          <Link
            to={item.path}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItem key={item.name} disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
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
                display: { xs: "block", sm: "block", md: "none", lg: "none" },
              }}
            >
              <MenuIcon />
            </IconButton>
            <Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
              <Avatar
                alt="logo"
                src={process.env.PUBLIC_URL + "/assets/go-logo-2020.svg"}
                sx={{
                  verticalAlign: "middle",
                  height: "2.2rem",
                  width: "6.25rem",
                  display: { xs: "block", sm: "block" },
                }}
                variant="square"
              ></Avatar>
            </Link>

            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: "block", sm: "block" },
                textTransform: "uppercase",
              }}
              fontWeight={"bold"}
              fontSize={"20px"}
            >
              <Link
                to={"/"}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Alert Hub
              </Link>
            </Typography>

            <Box
              sx={{
                display: { xs: "none", sm: "none", md: "block", lg: "block" },
              }}
            >
              {firstNavBarItems.map((item) => (
                <Link
                  to={item.path}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Button
                    key={item.name}
                    sx={{
                      color: "#fff",
                      padding: "0 20px",
                      textTransform: "capitalize",
                      borderRadius: "0px",
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
                      {item.name}{" "}
                    </Typography>
                  </Button>
                </Link>
              ))}
              <RoundButton />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Hidden mdDown>
        <AppBar position="static" color="primary">
          <Container maxWidth="lg">
            <Toolbar sx={{ padding: "0px !important" }}>
              <Box
                sx={{
                  display: { xs: "none", sm: "none", md: "block", lg: "block" },
                }}
              >
                {secondNavBarItems.map((item) => (
                  <Link
                    to={item.path}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Button
                      key={item.name}
                      sx={{
                        color: "#fff",
                        padding: "0 40px 0 0",
                        textTransform: "capitalize",
                        borderRadius: "0px",
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
                        {item.name}{" "}
                      </Typography>
                    </Button>
                  </Link>
                ))}
                <Button
                  sx={{
                    color: "#fff",
                    padding: "0 40px 0 0",
                    textTransform: "capitalize",
                    borderRadius: "0px",
                  }}
                  disableRipple
                  disableTouchRipple
                  disableFocusRipple
                >
                  <CustomNavItemDropdown
                    NavItemTitle="Regions"
                    DropdownItems={RegionsDropdownItems}
                  />
                </Button>

                <Button
                  sx={{
                    color: "#fff",
                    padding: "0 40px 0 0",
                    textTransform: "capitalize",
                    borderRadius: "0px",
                  }}
                  disableRipple
                  disableTouchRipple
                  disableFocusRipple
                >
                  <CustomNavItemDropdown
                    NavItemTitle="Hazard Type"
                    DropdownItems={HazardTypeDropdownItems}
                  />
                </Button>

                <Button
                  sx={{
                    color: "#fff",
                    padding: "0 40px 0 0",
                    textTransform: "capitalize",
                    borderRadius: "0px",
                  }}
                  disableRipple
                  disableTouchRipple
                  disableFocusRipple
                >
                  <CustomNavItemDropdown
                    NavItemTitle="Urgency Level"
                    DropdownItems={UrgencyLevelDropdownItems}
                  />
                </Button>
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
            keepMounted: true, // Better open performance on mobile.
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
