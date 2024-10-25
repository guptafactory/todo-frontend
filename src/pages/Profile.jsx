import { Navigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import Loader from "../components/Loader";

function Profile() {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) return <Loader />;
  if (!isAuthenticated) return <Navigate to={"/login"} />;

  return (
    <div className="profile">
      <h3>Your Name: {user.name}</h3>
      <p>Your Email: {user.email}</p>
    </div>
  );
}

export default Profile;
