import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "../context/AuthContext";
import PublicMapPage from "../pages/PublicMapPage";
import LoginPage from "../pages/LoginPage";
import AdminMapPage from "../pages/AdminMapPage";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<PublicMapPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route 
                path="/admin" 
                element={
                    <ProtectedRoute>
                        <AdminMapPage />
                    </ProtectedRoute>
                } 
            />
        </Routes>
    );
}