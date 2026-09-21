import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import AppShell from "./layout/AppShell";
import LandingPage from "./pages/landing/LandingPage";
import AdminLoginPage from "./pages/login/AdminLoginPage";
import VendorLoginPage from "./pages/login/VendorLoginPage";
import ConsumerLoginPage from "./pages/login/ConsumerLoginPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import PlaceholderPage from "./pages/dashboard/PlaceholderPage";
import LocationMasterListPage from "./pages/location-master/LocationMasterListPage";
import LocationMasterFormPage from "./pages/location-master/LocationMasterFormPage";

function WorkspaceLayout({ title = "Dashboard", subtitle = "FY 2025-26" }) {
  return (
    <AppShell title={title} subtitle={subtitle}>
      <Outlet />
    </AppShell>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login/admin" element={<AdminLoginPage />} />
        <Route path="/login/vendor" element={<VendorLoginPage />} />
        <Route path="/login/consumer" element={<ConsumerLoginPage />} />

        <Route
          path="/dashboard"
          element={<WorkspaceLayout title="Dashboard" subtitle="FY 2025-26 · Demo" />}
        >
          <Route index element={<DashboardPage />} />
          <Route path="location" element={<LocationMasterListPage />} />
          <Route path="location/add" element={<LocationMasterFormPage mode="add" />} />
          <Route path="location/edit" element={<LocationMasterFormPage mode="edit" />} />
          <Route path="*" element={<PlaceholderPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
