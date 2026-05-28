import z from "zod";

export const loginSchema = z.object({
  phone: z
    .string()
    .min(1, "Phone number is required.")
    .min(7, "Phone number is too short.")
    .max(12, "Phone number is too long.")
    .regex(/^\d+$/, "Phone number must be numbers."),
  password: z
    .string()
    .min(1, "Password is required.")
    .min(8, "Password must be 8 digits.")
    .max(8, "Password must be 8 digits.")
    .regex(/^\d+$/, "Password must be numbers."),
});

export const registerSchema = z.object({
  phone: z
    .string()
    .min(1, "Phone number is required.")
    .min(7, "Phone number is too short.")
    .max(12, "Phone number is too long.")
    .regex(/^\d+$/, "Phone number must be numbers."),
});

export const otpSchema = z.object({
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export const confirmPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be 8 digits.")
      .max(8, "Password must be 8 digits.")
      .regex(/^\d+$/, "Password must be numbers."),
    confirmPassword: z
      .string()
      .min(8, "Confirm Password must be 8 digits.")
      .max(8, "Confirm Password must be 8 digits.")
      .regex(/^\d+$/, "Confirm Password must be numbers."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });
