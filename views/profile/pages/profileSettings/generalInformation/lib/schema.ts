import { z } from 'zod'

export const generalSchema = z.object({
  username: z
    .string()
    .min(6, { message: 'Minimum number of characters 6' })
    .max(30, { message: ' Maximum number of characters 30' })
    .regex(/^[A-Za-z0-9_-]+$/, {
      message: 'Name can only contain 0-9, a-z, A-Z, -, _',
    })
    .optional(),
  firstName: z
    .string()
    .min(6, { message: 'Minimum number of characters 6' })
    .max(30, { message: ' Maximum number of characters 30' })
    .regex(/^[A-Za-z0-9_-]+$/, {
      message: 'Name can only contain 0-9, a-z, A-Z, -, _',
    }),
  lastName: z
    .string()
    .min(6, { message: 'Minimum number of characters 6' })
    .max(30, { message: ' Maximum number of characters 30' })
    .regex(/^[A-Za-z0-9_-]+$/, {
      message: 'Name can only contain 0-9, a-z, A-Z, -, _',
    }),
  dateOfBirth: z.any(),
  countryId: z.any(),
  cityId: z.any(),
  aboutMe: z.string().optional(),
})

export type InputsName = z.infer<typeof generalSchema>
