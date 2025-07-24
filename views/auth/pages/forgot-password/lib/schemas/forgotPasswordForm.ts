import * as z from 'zod'

export const forgotPasswordFormSchema = z.object({
  email: z.string().email("User with this email doesn't exist"),
  captchaToken: z.string()
})

export type InputForm = z.infer<typeof forgotPasswordFormSchema>
