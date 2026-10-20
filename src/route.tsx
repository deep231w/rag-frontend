import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import type { ReactElement } from "react";

import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import NewHome from "./pages/Home/NewHome";
import Dashboard from "./components/Dashboard";
import CreateBot from "./components/CreateBot";
import ManageBots from "./components/ManageBots";
import Settings from "./components/Settings";
import { isAuthenticated } from "./auth";
import LandingPage from "./pages/landingPage";

const ProtectedRoute: React.FC<{ children: ReactElement }> = ({ children }) => {
  const location = useLocation();
  const token = isAuthenticated();

  if (!token) {
    return <Navigate to="/signin" replace state={{ from: location.pathname + location.search }} />;
  }

  return children;
};

const PublicOnlyRoute: React.FC<{ children: ReactElement }> = ({ children }) => {
  const location = useLocation();
  const token = isAuthenticated();

  if (token) {
    const from = (location.state as { from?: string } | null)?.from || "/home/dashboard";
    return <Navigate to={from} replace />;
  }

  return children;
};

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={isAuthenticated() ? <Navigate to="/home/dashboard" replace /> : <Navigate to="/signin" replace />} /> */}
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/signup" element={<PublicOnlyRoute><SignUp /></PublicOnlyRoute>} />
        <Route path="/signin" element={<PublicOnlyRoute><SignIn /></PublicOnlyRoute>} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <NewHome />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="create-bot" element={<CreateBot />} />
          <Route path="manage-bots" element={<ManageBots />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}