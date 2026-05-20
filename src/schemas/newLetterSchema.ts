import { z } from "zod";

export const newLetterSchema = z.object({
  email: z.email({
    message: "Please enter a valid email address",
  }),
});
