import { z } from "zod";

// Define the schema for email and password validation
export const signUpSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"), // Minimum length
});

export const validateSignUp = (data: { email: string; password: string }) => {
    try {
      signUpSchema.parse(data);
      return true; // Return true if validation passes
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.errors; // Return validation errors
      }
      return [];
    }
};