import { Button, ButtonProps } from "../ui/button";

const CancelButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button variant="secondary" {...props}>
      Cancel
    </Button>
  );
};

export default CancelButton;
