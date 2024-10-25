import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./contexts/AuthContext";
import "./styles/app.scss";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Header from "./components/Header";
import { SERVER } from "./utils/constants";

function App() {
    const {  setIsAuthenticated, setIsLoading,  setUser } =
    useAuth();

  useEffect(() =>{
    async function getUserDetails() {
      setIsLoading(true);
      try{
        const {data} = await axios.get(`${SERVER}/user/me`, {
          withCredentials: true,
          params: { _cb: new Date().getTime() },
          responseType: "json",
        });

        console.log(data.user);
        setUser(data.user);
        setIsAuthenticated(true);
      }catch(error) {
        console.log(error.response.data.message);
        setUser({});
        setIsAuthenticated(false);
      }
      finally {
        setIsLoading(false);
      }
    }
    getUserDetails();
  }, [setIsAuthenticated, setIsLoading, setUser])
  
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
