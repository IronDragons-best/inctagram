import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().email({
    message: 'The email must be in the format\n Epam@epam.com',
  }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .max(20, { message: 'Password must not be more than 20 characters' })
    .regex(/^[\p{L}\d!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]+$/u, {
      message: 'Password can only contain allowed characters.',
    })
    .refine((value) => /^[A-ZА-Я]/.test(value), {
      message: 'Password must start with an uppercase letter.',
    })
    .refine((value) => /\d/.test(value), {
      message: 'Password must include at least one digit.',
    })
});

export type InputsForm = z.infer<typeof signInSchema>