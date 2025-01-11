import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../config/env";
import { generateToken } from "../utils/jwt";
import { RequestHandler } from "express";
import { setCookie } from "../utils/cookie";
import { FIFTEEN_MIN_MS, THRITY_DAYS_MS } from "../lib/date";

interface DecodedToken {
  sessionId: string;
  userId: string;
  exp: number;
}

declare global {
  namespace Express {
    export interface Request {
      userId: string;
    }
  }
}

export const authenticate: RequestHandler = async (
  req,
  res,
  next
): Promise<void> => {
  try {
    const { access, refresh } = req.cookies || {};

    if (!refresh) {
      res.status(401).json({ message: "Unauthorized - No Token Provided" });
      return;
    }

    // Validate Refresh Token
    const decodedRefresh = jwt.verify(
      refresh,
      REFRESH_TOKEN_SECRET
    ) as DecodedToken;
    const { userId, exp } = decodedRefresh;

    const currentTime = Math.floor(Date.now() / 1000);
    if (exp - currentTime < 3600) {
      console.log("Refresh token is expiring soon. Generating a new one...");
      const newRefreshToken = generateToken({
        type: "refresh",
        userId,
      });

      setCookie({
        type: "refresh",
        token: newRefreshToken,
        expiresAt: THRITY_DAYS_MS,
        res,
      });
    }

    // Validate Access Token
    if (access) {
      const decodedAccess = verifyToken(access, ACCESS_TOKEN_SECRET);
      if (decodedAccess) {
        req.userId = decodedAccess.userId;
        return next(); // Access token is valid
      }
      console.log("Access token invalid, generating a new one...");
    }

    // Generate new Access Token
    const newAccessToken = generateToken({ type: "access", userId });
    setCookie({
      type: "access",
      token: newAccessToken,
      expiresAt: FIFTEEN_MIN_MS,
      res,
    });
    req.userId = userId;

    next();
  } catch (error: any) {
    console.error("Error authenticating user:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Token verification helper
const verifyToken = (token: string, secret: string): DecodedToken | null => {
  try {
    return jwt.verify(token, secret) as DecodedToken;
  } catch {
    return null;
  }
};
