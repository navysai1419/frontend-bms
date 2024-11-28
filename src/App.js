import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import LoginPage from "./components/LoginPage/LoginPage";
import Header from "./components/Header/Header";
import Livemonitoring from "./scenes/users";
import Historical from "./scenes/events";
import Alarms from "./scenes/alarms";
import Daywise from "./scenes/daywise";
import Monthly from "./scenes/monthly";
import Preferences from "./scenes/preferences";
import IssueTracking from "./scenes/issuetracking";
import Events from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Users from "./scenes/users";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simulate login success
    setIsAuthenticated(true);
    navigate("/dashboard"); // Redirect to dashboard after login
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {isAuthenticated && <Sidebar isSidebar={isSidebar} />}
          <main className="content">
            {isAuthenticated && <Header />}
            {isAuthenticated && <Topbar setIsSidebar={setIsSidebar} />}
            <Routes>
              {!isAuthenticated ? (
                <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
              ) : (
                <>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/livemonitoring" element={<Livemonitoring />} />
                  <Route path="/historical" element={<Historical />} />
                  <Route path="/alarms" element={<Alarms />} />
                  <Route path="/daywise" element={<Daywise />} />
                  <Route path="/monthly" element={<Monthly />} />
                  <Route path="/preferences" element={<Preferences />} />
                  <Route path="/issuetracking" element={<IssueTracking />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/users" element={<Users />} />
                </>
              )}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
