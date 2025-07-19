import { z } from "zod";

const passwordSchema = z
  .string()
  .min(6, { message: "Minimum number of characters 6" })
  .max(20, { message: " Maximum number of characters 20" })
  .regex(/^[A-Za-z0-9!"#$%&'()*+,\-./:;<=>?@\[\\\]^_`{|}~]+$/);

export const signUpSchema = z
  .object({
    username: z
      .string()
      .min(6, { message: "Minimum number of characters 6" })
      .max(30, { message: " Maximum number of characters 30" })
      .regex(/^[A-Za-z0-9_-]+$/),
    email: z.string().email({
      message: "The email must match the format example@example.com",
    }),
    password: passwordSchema,
    passwordConfirmation: passwordSchema,
    agreeToTerms: z.boolean(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords must match",
    path: ["passwordConfirmation"],
  });

export type Inputs = z.infer<typeof signUpSchema>;
