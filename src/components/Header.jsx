import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { SERVER } from "../utils/constants";
import axios from "axios";
import toast from "react-hot-toast";

function Header() {
  const { isAuthenticated, setIsAuthenticated, isLoading, setIsLoading } =
    useAuth();

  async function handleLogout(e) {
    e.preventDefault();
    if (!isAuthenticated) return;
    setIsLoading(true);

    try {
      await axios.get(`${SERVER}/user/logout`, {
        withCredentials: true,
      });

      // toast.success(data.message);
      toast.success("User logged out successfully");
      setIsAuthenticated(false);
    } catch (error) {
      toast.error(error.message);
      setIsAuthenticated(true);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <nav className="header">
      <div>
        <h2>Todo App</h2>
      </div>

      <article>
        <Link to={"/"}>Home</Link>
        <Link to={"/profile"}>Profile</Link>
        {isAuthenticated && (
          <button disabled={isLoading} onClick={handleLogout}>
            Logout
          </button>
        )}
        {!isAuthenticated && <Link to={"/login"}>Login</Link>}
      </article>
    </nav>
  );
}

export default Header;
