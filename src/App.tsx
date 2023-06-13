import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import ResponsiveAppBar from "./components/global/Navigation Bar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./scenes/Home";
import About from "./scenes/About";
import Resources from "./scenes/Resources";
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
              <Route path="/resources" element={<Resources />} />
            </Routes>
          </Box>
        </CssBaseline>
      </ThemeProvider>
    </div>
  );
}

export default App;
