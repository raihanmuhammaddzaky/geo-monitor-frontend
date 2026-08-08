import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "../context/AuthContext"; // Perhatikan titik-titiknya (..) karena kita di dalam folder routes
import PublicMapPage from "../pages/PublicMapPage";


export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<PublicMapPage />} />
        </Routes>
    );
}