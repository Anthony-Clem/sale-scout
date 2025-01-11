import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/auth-layout";
import LoginPage from "./pages/auth/login-page";
import RootLayout from "./layouts/root-layout";
import HomePage from "./pages/home/home-page";
import DashboardPage from "./pages/dashboard/dashboard-page";
import SignUpPage from "./pages/auth/signup-page";
import { checkAuth } from "./hooks/auth";
import { Loader2 } from "lucide-react";

function App() {
  const { data: authUser, isLoading } = checkAuth();

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="size-5 animate-spin" />
      </div>
    );
  }

  return (
    <Routes>
      {/* Public and Protected Routes under RootLayout */}
      <Route path="/" element={<RootLayout />}>
        {/* Home Page (Accessible to All) */}
        <Route index element={<HomePage />} />

        {/* Protected Route */}
        {authUser ? (
          <Route path="dashboard" element={<DashboardPage />} />
        ) : (
          <Route path="dashboard" element={<Navigate to="/auth/login" />} />
        )}
      </Route>

      {/* Auth Routes */}
      <Route
        path="/auth"
        element={!authUser ? <AuthLayout /> : <Navigate to="/dashboard" />}
      >
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
      </Route>
    </Routes>
  );
}

export default App;
