import { z } from "zod";

const validatePasswordMatch = (schema: z.ZodType<any, any>) =>
  schema
    .refine((data) => data.password === data.passwordConfirmation, {
      message: "Passwords must match",
      path: ["passwordConfirmation"],
    })
    .refine((data) => data.passwordConfirmation !== "", {
      message: "Shouldn't be empty",
      path: ["passwordConfirmation"],
    });

const passwordSchema = z
  .string()
  .min(6, { message: "Minimum number of characters 6" })
  .max(20, { message: " Maximum number of characters 20" })
  .regex(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9!"#$%&'()*+,\-./:;<=>?@\[\\\]^_`{|}~]+$/,
    { message: "Password must contain 0-9, a-z, A-Z" },
  );

export const signUpSchema = z.object({
  username: z
    .string()
    .min(6, { message: "Minimum number of characters 6" })
    .max(30, { message: " Maximum number of characters 30" })
    .regex(/^[A-Za-z0-9_-]+$/, {
      message: "Name can only contain 0-9, a-z, A-Z, -, _",
    }),
  email: z.string().email({
    message: "The email must match the format example@example.com",
  }),
  password: passwordSchema,
  passwordConfirmation: z.string(),
  agreeToTerms: z.boolean(),
});

export const signUpValidationSchema = validatePasswordMatch(signUpSchema);

export type Inputs = z.infer<typeof signUpSchema>;
