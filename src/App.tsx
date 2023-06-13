import { Box, CssBaseline, ThemeProvider, Toolbar } from "@mui/material";
import ResponsiveAppBar from "./components/global/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./scenes/Home";
import About from "./scenes/About";
import { theme } from "./theme";

function App() {
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <ResponsiveAppBar></ResponsiveAppBar>
          <Box component="main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </Box>
        </CssBaseline>
      </ThemeProvider>
    </div>
  );
}

export default App;
