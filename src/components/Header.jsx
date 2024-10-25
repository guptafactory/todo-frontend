import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import Logout from "./Logout";

function Header() {
  const { isAuthenticated } = useAuth();

  return (
    <nav className="header">
      <div>
        <h2>Todo App</h2>
      </div>

      <article>
        <Link to={"/"}>Home</Link>
        <Link to={"/profile"}>Profile</Link>
        {isAuthenticated && <Logout />}
        {!isAuthenticated && <Link to={"/login"}>Login</Link>}
      </article>
    </nav>
  );
}

export default Header;
