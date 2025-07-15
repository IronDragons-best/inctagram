import * as z from 'zod'

export const forgotPasswordFormSchema = z.object({
  email: z.string().email("User with this email doesn't exist"),
})

export type InputForm = z.infer<typeof forgotPasswordFormSchema>
