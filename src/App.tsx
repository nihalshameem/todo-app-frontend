import React, { useState, useEffect } from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Box, Toolbar } from "@mui/material";

import SignIn from "./components/SignIn/SignIn.lazy";
import NewTask from "./components/NewTask/NewTask.lazy";
import CompletedTasks from "./components/CompletedTasks/CompletedTasks.lazy";
import TodayTask from "./components/TodayTask/TodayTask.lazy";
import OldTask from "./components/OldTask/OldTask.lazy";
import UpcomingTask from "./components/UpcomingTask/UpcomingTask.lazy";
import SideMenu from "./components/SideMenu/SideMenu.lazy";
import { authService } from "./services/authService";
import { getErrorMsg } from "./config";
import { AuthFormIntserface } from "./utils/interfaces";

const drawerWidth = 240;

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleAuth = async (req: AuthFormIntserface) => {
    authService(req)
      .then((res) => {
        if (res.status === "success") {
          setIsLoggedIn(true);
          localStorage.setItem("token", res.data.token);
        } else {
          alert(res.message);
        }
      })
      .catch((e) => alert(getErrorMsg(e)));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.clear();
  };

  const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    return isLoggedIn ? children : <Navigate to="/signin" />;
  };

  return (
    <Router>
      <div className="App">
        <Box sx={{ display: "flex" }}>
          {isLoggedIn && <SideMenu logout={handleLogout} />}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
            }}
          >
            <Toolbar />
            <Routes>
              <Route
                path="/signin"
                element={
                  isLoggedIn ? (
                    <Navigate to="/" />
                  ) : (
                    <SignIn submit={handleAuth} />
                  )
                }
              />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <NewTask />
                  </PrivateRoute>
                }
              />
              <Route
                path="/today-tasks"
                element={
                  <PrivateRoute>
                    <TodayTask />
                  </PrivateRoute>
                }
              />
              <Route
                path="/old-tasks"
                element={
                  <PrivateRoute>
                    <OldTask />
                  </PrivateRoute>
                }
              />
              <Route
                path="/upcoming-tasks"
                element={
                  <PrivateRoute>
                    <UpcomingTask />
                  </PrivateRoute>
                }
              />
              <Route
                path="/completed-tasks"
                element={
                  <PrivateRoute>
                    <CompletedTasks />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Box>
        </Box>
      </div>
    </Router>
  );
};

export default App;
