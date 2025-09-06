import { z } from 'zod'

const MIN_AGE = 13

export const generalSchema = z.object({
  userName: z
    .string()
    .min(6, { message: 'Minimum number of characters 6' })
    .max(30, { message: ' Maximum number of characters 30' })
    .regex(/^[A-Za-z0-9_-]+$/, {
      message: 'Name can only contain 0-9, a-z, A-Z, -, _',
    }),
  firstName: z
    .string()
    .min(1, { message: 'Minimum number of characters 1' })
    .max(50, { message: ' Maximum number of characters 50' })
    .regex(/^[A-Za-zА-Яа-яЁё]+$/, {
      message: 'Name can only contain Russian and Latin letters',
    }),
  lastName: z
    .string()
    .min(1, { message: 'Minimum number of characters 1' })
    .max(50, { message: ' Maximum number of characters 50' })
    .regex(/^[A-Za-zА-Яа-яЁё]+$/, {
      message: 'Name can only contain Russian and Latin letters',
    }),
  dateOfBirth: z
    .object({
      from: z.date(),
      to: z.date().optional(),
    })
    .refine(
      val => {
        if (!val?.from) return true // поле необязательное
        const today = new Date()
        const age = today.getFullYear() - val.from.getFullYear()
        const isBirthdayPassed =
          today.getMonth() > val.from.getMonth() ||
          (today.getMonth() === val.from.getMonth() && today.getDate() >= val.from.getDate())
        return age > MIN_AGE || (age === MIN_AGE && isBirthdayPassed)
      },
      {
        message: 'A user under 13 cannot create a profile.',
        path: ['from'],
      }
    )
    .optional(),
  countryId: z.number().optional(),
  cityId: z.number().optional(),
  aboutMe: z
    .string()
    .trim()
    .max(200)
    .regex(/^[A-Za-zА-Яа-яЁё0-9_\-\s.,!?;:()"'«»…]*$/, {
      message: 'Name can only contain 0-9, a-z, A-Z, а-я, А-Я, spaces, -, _, ',
    })
    .optional(),
})

export type InputsName = z.infer<typeof generalSchema>
