import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { SERVER } from "../utils/constants";
import toast from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated, isLoading, setIsLoading } =
    useAuth();

  if (isAuthenticated) return <Navigate to={"/"} />;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    setIsLoading(true);

    try {
      const { data } = await axios.post(
        `${SERVER}/user/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setIsAuthenticated(true);
    } catch (error) {
      toast.error(error.message);
      setIsAuthenticated(false);
    } finally {
      setEmail("");
      setPassword("");
      setIsLoading(false);
    }
  }

  return (
    <div className="login">
      <section>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter email.."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter password.."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={isLoading}>
            Login
          </button>
          <h4>Or</h4>
          <Link to={"/register"}>Sign Up</Link>
        </form>
      </section>
    </div>
  );
}

export default Login;
