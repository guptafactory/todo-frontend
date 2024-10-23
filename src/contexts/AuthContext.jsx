import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, isLoading, setIsLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("AuthContext was used outside the AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
