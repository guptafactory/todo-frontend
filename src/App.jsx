import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/app.scss";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Header from "./components/Header";
import { Toaster } from "react-hot-toast";

function App() {
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
