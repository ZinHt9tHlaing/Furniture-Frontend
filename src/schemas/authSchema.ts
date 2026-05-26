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

export const registerSchema = z
  .object({
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
    confirmPassword: z
      .string()
      .min(1, "Confirm password is required.")
      .min(8, "Confirm password must be 8 digits.")
      .max(8, "Confirm password must be 8 digits.")
      .regex(/^\d+$/, "Confirm password must be numbers."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });
