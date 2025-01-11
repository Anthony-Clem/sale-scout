import { logout } from "@/hooks/auth";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const UserButton = ({ email }: { email: string }) => {
  const { mutate: logoutMutation } = logout();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="capitalize rounded-full"
          variant="outline"
          size="icon"
        >
          {email[0]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive font-bold cursor-pointer"
          onClick={() => logoutMutation()}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
