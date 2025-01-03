import { z } from "zod";

// Define the schema for email and password validation
export const signUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"), // Minimum length
});

export const validateSignIn = (data: { email: string; password: string }) => {
  signUpSchema.parse(data);
};
