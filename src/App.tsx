import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Box, Toolbar } from "@mui/material";
import SignIn from "./components/SignIn/SignIn.lazy";
import { apiUri, AuthFormIntserface } from "./config";
import SideMenu from "./components/SideMenu/SideMenu.lazy";
import NewTask from "./components/NewTask/NewTask.lazy";
import CompletedTasks from "./components/CompletedTasks/CompletedTasks.lazy";
import TodayTask from "./components/TodayTask/TodayTask.lazy";
import OldTask from "./components/OldTask/OldTask.lazy";
import UpcomingTask from "./components/UpcomingTask/UpcomingTask.lazy";

const drawerWidth = 240;

const App: React.FC = () => {
  const [todos, setTodos] = useState<any[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/todos");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const toggleTodo = async (id: string, completed: boolean) => {
    try {
      await axios.put(`http://localhost:5000/todos/${id}`, { completed });
      fetchTodos();
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`);
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleAuth = async (req: AuthFormIntserface) => {
    try {
      await axios
        .post(`${apiUri}auth/${req.mode}`, {
          username: req.username,
          password: req.password,
        })
        .then((res) => {
          setIsLoggedIn(true);
          res.data &&
            res.data.token &&
            localStorage.setItem("token", res.data.token);
        })
        .catch((e) => {
          if (e?.response?.data?.message) {
            alert(e?.response?.data?.message);
          } else {
            alert("something went wrong");
          }
        });
    } catch (error) {
      console.error("Error during authentication:", error);
    }
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
