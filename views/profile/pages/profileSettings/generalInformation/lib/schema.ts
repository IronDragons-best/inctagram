import { z } from "zod";

export const generalSchema = z.object({
  username: z
    .string()
    .min(6, { message: "Minimum number of characters 6" })
    .max(30, { message: " Maximum number of characters 30" })
    .regex(/^[A-Za-z0-9_-]+$/, {
      message: "Name can only contain 0-9, a-z, A-Z, -, _",
    }),
    firstname: z
    .string()
    .min(6, { message: "Minimum number of characters 6" })
    .max(30, { message: " Maximum number of characters 30" })
    .regex(/^[A-Za-z0-9_-]+$/, {
      message: "Name can only contain 0-9, a-z, A-Z, -, _",
    }),
    lastname: z
    .string()
    .min(6, { message: "Minimum number of characters 6" })
    .max(30, { message: " Maximum number of characters 30" })
    .regex(/^[A-Za-z0-9_-]+$/, {
      message: "Name can only contain 0-9, a-z, A-Z, -, _",
    })
});


export type InputsName = z.infer<typeof generalSchema>;
