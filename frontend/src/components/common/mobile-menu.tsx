import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import AuthButton from "../auth/auth-button";

const MobileMenu = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="block sm:hidden">
          <Menu />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-5 space-y-3">
        <AuthButton to="/auth/signup" size="lg">
          Sign up
        </AuthButton>
        <AuthButton to="/auth/login" variant="outline" size="lg">
          Login
        </AuthButton>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileMenu;
