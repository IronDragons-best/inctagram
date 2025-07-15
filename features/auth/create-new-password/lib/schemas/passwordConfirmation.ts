import { z } from 'zod';

const passwordSchema = z
  .string()
  .min(6)
  .max(20)
  .regex(/^[A-Za-z0-9!"#$%&'()*+,\-./:;<=>?@\[\\\]^_`{|}~]+$/);

export const passwordConfirmationSchema = z
  .object({
      password: passwordSchema,
      confirmationPassword: passwordSchema,
    },
  )
  .refine(data => data.password === data.confirmationPassword, {
    message: 'The passwords must match',
    path: ['confirmationPassword'],
  });

export type InputError = z.infer<typeof passwordConfirmationSchema>;