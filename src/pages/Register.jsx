import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

import { useAuth } from "../contexts/AuthContext";
import { SERVER } from "../utils/constants";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated, isLoading, setIsLoading } =
    useAuth();

  if (isAuthenticated) return <Navigate to={"/"} />;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name || !email || !password) return;
    setIsLoading(true);

    try {
      const { data } = await axios.post(
        `${SERVER}/user/new`,
        {
          name,
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
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
    } finally {
      setName("");
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
            type="name"
            placeholder="Enter name.."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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
            Sign Up
          </button>
          <h4>Or</h4>
          <Link to={"/login"}>Login</Link>
        </form>
      </section>
    </div>
  );
}

export default Register;
