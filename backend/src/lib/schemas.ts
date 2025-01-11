import { z } from "zod";

export const emailSchema = z
  .string()
  .trim()
  .email()
  .max(255)
  .transform((value) => value.toLowerCase());

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().trim().min(1, "Required").max(255),
});

export const signupSchema = loginSchema
  .extend({
    password: z
      .string()
      .trim()
      .min(8, "Password must be at least 8 characters")
      .max(255),
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export const productScehma = z.object({
  name: z.string().trim().min(1, "Required"),
  url: z.string().min(1, "Required").url(),
});
