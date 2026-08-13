import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "../context/AuthContext";
import PublicMapPage from "../pages/PublicMapPage";
import LoginPage from "../pages/LoginPage";
import AdminMapPage from "../pages/AdminMapPage";
import WorkerDashboardPage from "../pages/WorkerDashboardPage";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<PublicMapPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route 
                path="/admin" 
                element={
                    <ProtectedRoute allowedRoles={['admin']}>
                        <AdminMapPage />
                    </ProtectedRoute>
                } 
            />
            <Route 
                path="/worker" 
                element={
                    <ProtectedRoute allowedRoles={['worker']}>
                        <WorkerDashboardPage />
                    </ProtectedRoute>
                } 
            />
        </Routes>
    );
}