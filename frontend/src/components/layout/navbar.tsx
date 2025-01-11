import Logo from "../common/logo";
import MobileMenu from "../common/mobile-menu";
import AuthButton from "../auth/auth-button";
import UserButton from "../auth/user-button";
import { checkAuth } from "@/hooks/auth";

const Navbar = () => {
  const { data: authUser } = checkAuth();

  return (
    <header className="w-full p-4 border-b border-neutral-200 flex items-center justify-between">
      <Logo />
      <div className="sm:flex gap-2 hidden">
        {!authUser ? (
          <>
            <AuthButton to="/auth/signup">Sign up</AuthButton>
            <AuthButton to="/auth/login" variant="outline">
              Login
            </AuthButton>
          </>
        ) : (
          <UserButton email={authUser.email} />
        )}
      </div>
      <MobileMenu />
    </header>
  );
};

export default Navbar;
