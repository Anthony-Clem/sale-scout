import { getWelcomeEmailTemplate } from "../lib/emailTemplates";
import { loginSchema, signupSchema } from "../lib/schemas";
import UserModel from "../models/user.model";
import { setCookie } from "../utils/cookie";
import { FIFTEEN_MIN_MS, THRITY_DAYS_MS } from "../lib/date";
import { generateToken } from "../utils/jwt";
import { sendMail } from "../utils/sendMail";
import { tryCatch } from "../utils/tryCatch";

export const signup = tryCatch(async (req, res) => {
  const { email, password } = signupSchema.parse(req.body);

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already in use" });
  }

  const user = await UserModel.create({
    email,
    password,
  });

  const { error } = await sendMail({
    to: user.email,
    ...getWelcomeEmailTemplate(),
  });

  if (error) {
    console.log(error);
  }

  const accessToken = generateToken({
    type: "access",
    userId: user.id,
  });

  const refreshToken = generateToken({
    type: "refresh",
    userId: user.id,
  });

  setCookie({
    type: "access",
    token: accessToken,
    expiresAt: FIFTEEN_MIN_MS,
    res,
  });
  setCookie({
    type: "refresh",
    token: refreshToken,
    expiresAt: THRITY_DAYS_MS,
    res,
  });

  res.status(201).json({ message: "User created successfully" });
});

export const login = tryCatch(async (req, res) => {
  const { email, password } = loginSchema.parse(req.body);

  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isMatching = await user.comparePasswords(password);
  if (!isMatching) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const accessToken = generateToken({
    type: "access",
    userId: user.id,
  });

  const refreshToken = generateToken({
    type: "refresh",
    userId: user.id,
  });

  setCookie({
    type: "access",
    token: accessToken,
    expiresAt: FIFTEEN_MIN_MS,
    res,
  });

  setCookie({
    type: "refresh",
    token: refreshToken,
    expiresAt: THRITY_DAYS_MS,
    res,
  });

  res.status(200).json({ message: "Logged in successfully" });
});

export const logout = tryCatch(async (req, res) => {
  res.clearCookie("access");
  res.clearCookie("refresh");

  res.status(200).json({ message: "Logged out successfully" });
});

export const checkAuth = tryCatch(async (req, res) => {
  const userId = req.userId;

  const user = await UserModel.findById(userId);

  res.status(200).json(user);
});
