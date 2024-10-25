import axios from "axios";
import toast from "react-hot-toast";
import { SERVER } from "../utils/constants";
import { useAuth } from "../contexts/AuthContext";

function Logout() {
  const { isAuthenticated, setIsAuthenticated, isLoading, setIsLoading } =
    useAuth();

  async function handleLogout(e) {
    e.preventDefault();
    if (!isAuthenticated) return;
    setIsLoading(true);

    try {
      const data = await axios.get(`${SERVER}/user/logout`, {
        withCredentials: true,
        params: { _cb: new Date().getTime() },
        responseType: "json",
      });
      console.log(data);
      toast.success(data.data.message);
      setIsAuthenticated(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(true);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <button disabled={isLoading} onClick={handleLogout}>
      Logout
    </button>
  );
}

export default Logout;
