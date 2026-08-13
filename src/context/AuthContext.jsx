import { createContext, useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { apiClient } from "../api/axiosConfig";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLogInUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          setUser(payload);
        } catch (error) {
          localStorage.removeItem("token");
          setUser(null);
        }
      }
      setIsLoading(false);
    }
    checkLogInUser();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await apiClient.post('auth/login', { email, password });
      const { token, user } = response.data.data;

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
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

export function ProtectedRoute({ children, allowedRoles }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    // Tampilkan loading spinner saat auth sedang dicek
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
