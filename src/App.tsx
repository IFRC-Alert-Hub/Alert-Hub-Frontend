import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import ResponsiveAppBar from "./components/NavigationBar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./scenes/Home";
import About from "./scenes/About";
import Resources from "./scenes/Resources";
import { theme } from "./theme";
import Login from "./scenes/Login";
import Footer from "./components/Footer";
import Region from "./scenes/Region";
import "./index.css";

function App() {
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box className="layout">
          <ResponsiveAppBar />
          <Box component="main" flexGrow="1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/login" element={<Login />} />
              <Route path="/regions/:id" element={<Region />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
