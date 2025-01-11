import { Button, ButtonProps } from "../ui/button";
import { Loader2 } from "lucide-react";

interface LoadingButtonProps extends ButtonProps {
  isLoading: boolean;
}

const LoadingButton = ({
  isLoading,
  children,
  ...props
}: LoadingButtonProps) => {
  return (
    <Button {...props} disabled={isLoading}>
      {isLoading && <Loader2 className="animate-spin mr-2" />}

      {children}
    </Button>
  );
};

export default LoadingButton;
