import Logo from "@/components/common/logo";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-3">
      <Logo />
      <Outlet />
    </main>
  );
};

export default AuthLayout;
