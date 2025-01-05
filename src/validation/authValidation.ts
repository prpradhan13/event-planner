import { z } from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters long").trim(),
  email: z.string().email("Invalid email address").trim(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const validateSignUp = (data: {fullName:string, email: string; password: string }) => {
  return signUpSchema.parse(data);
};

export const validateSignIn = (data: {email: string; password: string }) => {
  return signInSchema.parse(data);
};
