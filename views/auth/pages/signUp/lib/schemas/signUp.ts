import { z } from 'zod'
import {
  commonSchema,
  validatePasswordMatch,
} from '@/shared/schemas/types/validationSchemas/commonValidationSchema'

export const signInValidationSchema = validatePasswordMatch(commonSchema)

export type SignUpFormTypes = z.infer<typeof commonSchema>
