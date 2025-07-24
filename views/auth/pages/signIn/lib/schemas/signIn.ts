import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().email({
    message: 'The email must be in the format\n Epam@epam.com',
  }),
 
  password: z
  .string()
  .min(6, { message: "Minimum number of characters 6" })
  .max(20, { message: " Maximum number of characters 20" })
  .regex(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9!"#$%&'()*+,\-./:;<=>?@\[\\\]^_`{|}~]+$/,
    { message: "Password must contain 0-9, a-z, A-Z" },
  ),
});

export type InputsForm = z.infer<typeof signInSchema>