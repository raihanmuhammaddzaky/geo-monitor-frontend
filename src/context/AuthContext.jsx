import { createContext, useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { apiClient } from "../api/axiosConfig";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkLogInUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await apiClient.get("users/me");
          setUser(response.data.user);
        } catch (error) {
          localStorage.removeItem("token");
          setUser(null);
        }
      }
    }
    checkLogInUser();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await apiClient.post('auth/login', { email, password });
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      setUser(user);
      return true;
    } catch (error) {
      console.error("Gagal login:", error);
      return false; // Gagal login
    }
  }

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

export function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
