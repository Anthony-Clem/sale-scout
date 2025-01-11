import { Response } from "express";
import { NODE_ENV } from "../config/env";

type setCookieProps = {
  type: "access" | "refresh";
  token: string;
  expiresAt: number;
  res: Response;
};

export const setCookie = ({ type, token, expiresAt, res }: setCookieProps) => {
  res.cookie(type, token, {
    maxAge: expiresAt,
    httpOnly: true,
    sameSite: "strict",
    secure: NODE_ENV !== "development",
  });
};
