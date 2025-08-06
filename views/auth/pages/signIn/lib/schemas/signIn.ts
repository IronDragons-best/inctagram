import { z } from 'zod';
import { commonSchema } from '@/shared/schemas/types/validationSchemas/commonValidationSchema';

export const signInSchema = commonSchema.pick({
  email: true,
  password: true,
})

export type SignInFormTypes = z.infer<typeof signInSchema>