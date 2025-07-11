import { z } from "zod";

const passwordSchema = z
  .string()
  .min(6)
  .max(20)
  .regex(/^[A-Za-z0-9!"#$%&'()*+,\-./:;<=>?@\[\\\]^_`{|}~]+$/);

export const signUpSchema = z
  .object({
    userName: z
      .string()
      .min(6)
      .max(30)
      .regex(/^[A-Za-z0-9_-]+$/),
    email: z.string().email(),
    password: passwordSchema,
    confirmationPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmationPassword, {
    message: "Passwords aren't equal",
    path: ["confirmPassword"], // Указывает, где показывать ошибку
  });

export type Inputs = z.infer<typeof signUpSchema>;
