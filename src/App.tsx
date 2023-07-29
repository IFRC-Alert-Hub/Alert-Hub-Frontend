import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import ResponsiveAppBar from "./components/NavigationBar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./scenes/Home";
import About from "./scenes/About";
import Resources from "./scenes/Resources";
import { theme } from "./theme";
import Login from "./scenes/Login";
import Footer from "./components/Footer/Footer";
import Region from "./scenes/Region";
import "./index.css";
import AllAlerts from "./scenes/AllAlerts";
import Profile from "./scenes/Profile";
import Subscription from "./scenes/Subscription";
import Register from "./scenes/Register";
import ForgotPassword from "./scenes/ForgotPassword";
import PrivateRoutes from "./utils/PrivateRoute";
import { UserContextProvider } from "./context/UserContext";
import PageNotFound from "./scenes/404_Page";
import TestPerformance from "./API/test-performance";

function App() {
  // useEffect(() => {
  //   const handleWheel = (event: WheelEvent) => {
  //     const { deltaY } = event;

  //     const isScrollingAtTop = deltaY < 0 && window.scrollY === 0;

  //     if (isScrollingAtTop) {
  //       event.preventDefault();
  //     }
  //   };

  //   window.addEventListener("wheel", handleWheel, { passive: false });

  //   return () => {
  //     window.removeEventListener("wheel", handleWheel);
  //   };
  // }, []);

  return (
    <div className="app">
      <UserContextProvider>
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
                <Route path="/register" element={<Register />} />
                <Route path="/forget-password" element={<ForgotPassword />} />
                <Route path="/regions/:id" element={<Region />} />
                <Route path="/alerts/all" element={<AllAlerts />} />
                <Route path="/account/" element={<PrivateRoutes />}>
                  <Route path="profile" element={<Profile />} />
                  <Route path="subscription" element={<Subscription />} />
                </Route>
                <Route path="/test-performance" element={<TestPerformance />} />

                <Route path="*" element={<PageNotFound />}></Route>
              </Routes>
            </Box>
            <Footer />
          </Box>
        </ThemeProvider>
      </UserContextProvider>
    </div>
  );
}

export default App;
