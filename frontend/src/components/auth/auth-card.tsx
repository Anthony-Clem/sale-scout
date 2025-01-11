import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface AuthCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  redirectLink: string;
  redirectText: string;
}

const AuthCard = ({
  title,
  description,
  children,
  redirectLink,
  redirectText,
}: AuthCardProps) => {
  return (
    <Card className="max-w-[480px] w-full">
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <Link to={redirectLink} className="text-sm mx-auto hover:underline">
          {redirectText}
        </Link>
      </CardFooter>
    </Card>
  );
};

export default AuthCard;
