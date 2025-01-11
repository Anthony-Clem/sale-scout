import { Link } from "react-router-dom";
import { Button, ButtonProps } from "../ui/button";

interface AuthButtonProps extends ButtonProps {
  to: string;
}

const AuthButton = ({ className, children, to, ...props }: AuthButtonProps) => {
  return (
    <Link to={to} className={className}>
      <Button {...props} className="w-full">
        {children}
      </Button>
    </Link>
  );
};

export default AuthButton;
