import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="text-4xl font-bold">
      sale<span className="text-red-600">scout</span>.
    </Link>
  );
};

export default Logo;
