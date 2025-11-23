import { z } from "zod";

export const PasswordEmailSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "passwrod must be 6 or more characters long!" }),
});

export type PasswordEmailSchemaType = z.infer<typeof PasswordEmailSchema>;
