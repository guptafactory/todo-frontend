import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";
import { getLogoutUser } from "../services/apiUser";

function Logout() {
  const { isAuthenticated, setIsAuthenticated, isLoading, setIsLoading } =
    useAuth();

  async function handleLogout(e) {
    e.preventDefault();
    if (!isAuthenticated) return;
    setIsLoading(true);

    try {
      const data = await getLogoutUser();
      toast.success(data.message);
      setIsAuthenticated(false);
    } catch (error) {
      toast.error(error.response?.data?.message);
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
