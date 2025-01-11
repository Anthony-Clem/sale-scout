import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../config/env";

type generateTokenProps = {
  type: "access" | "refresh";
  userId: string;
};

export const generateToken = ({ type, userId }: generateTokenProps) => {
  const isAccess = type === "access";

  const token = jwt.sign(
    {
      userId,
    },
    isAccess ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET,
    {
      expiresIn: isAccess ? "15m" : "30d",
    }
  );

  return token;
};
