import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/app.scss";

import { useAuth } from "./contexts/AuthContext";
import { getUser } from "./services/apiUser";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Header from "./components/Header";

function App() {
  const { isAuthenticated, setIsAuthenticated, setIsLoading, setUser } =
    useAuth();

  useEffect(() => {
    setIsLoading(true);
    async function getUserDetails() {
      try {
        const data = await getUser();
        setUser(data.user);
        setIsAuthenticated(true);
      } catch (error) {
        setUser({});
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    }
    getUserDetails();
  }, [isAuthenticated, setIsAuthenticated, setIsLoading, setUser]);

  return (
    <Router>
      <Header />

      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/profile"} element={<Profile />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
      </Routes>

      <Toaster />
    </Router>
  );
}

export default App;
