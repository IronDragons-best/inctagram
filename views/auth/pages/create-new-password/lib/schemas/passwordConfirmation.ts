import { z } from 'zod';
import {
  commonSchema,
  validatePasswordMatch,
} from '@/shared/schemas/types/validationSchemas/commonValidationSchema';

const passwordRecoverySchema = commonSchema.pick({
  password: true,
  passwordConfirmation: true,
})

export const passwordRecoveryValidation = validatePasswordMatch(passwordRecoverySchema)

export type PasswordRecoveryFormType = z.infer<typeof passwordRecoverySchema>
