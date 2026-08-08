import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, ProtectedRoute } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
