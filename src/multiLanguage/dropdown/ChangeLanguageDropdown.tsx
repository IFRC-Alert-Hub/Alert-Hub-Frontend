import { useEffect, useState } from "react";
import { getLanguage, setLanguage, Language } from "../helpers/useLanguage";
import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import supportedLanguages from "./../locales/supportedLanguages.json";
const ChangeLanguageDropdown = () => {
  const language = getLanguage();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [currentLanguage, setCurrentLanguage] = useState<Language>(language);

  useEffect(() => {
    setLanguage(currentLanguage);
  }, [currentLanguage]);

  function handleChangeLanguage(lang: string) {
    setCurrentLanguage(lang as Language);
    window.location.reload();
  }

  return supportedLanguages.length > 1 ? (
    <Box display="inline">
      <Button
        id="language-button"
        aria-controls={open ? "language-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon sx={{ color: "#f5333f" }} />}
        disableRipple
        disableTouchRipple
        disableFocusRipple
        sx={{
          "&:hover": { backgroundColor: "transparent !important" },
          "&:focus": { backgroundColor: "transparent !important" },
        }}
      >
        <Typography variant="h6">{currentLanguage}</Typography>
      </Button>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "language-button",
        }}
      >
        {supportedLanguages.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => handleChangeLanguage(lang.code)}
          >
            {lang.name}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  ) : (
    <></>
  );
};

export default ChangeLanguageDropdown;
