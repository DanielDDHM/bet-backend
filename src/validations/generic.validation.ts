import * as z from "zod";
export const VerifyValidation = z.object({
  role: z.string()
    .min(1, { message: 'NOT_EMPTY' })
    .optional(),
  nick: z.string()
    .min(3, { message: 'NOT_EMPTY' })
    .optional(),
}).strict();

export const PaginateValidation = z.object({
  page: z.number()
    .nonnegative()
    .optional(),
  perPage: z.number()
    .nonnegative()
    .optional()
}).strict();

export const LoginValidation = z.object({
  nick: z.string()
    .min(3, { message: 'NOT_EMPTY' })
    .optional(),
  email: z.string()
    .min(2, { message: 'NON_EMPTY' })
    .optional(),
  password: z.string()
    .min(2, { message: 'NON_EMPTY' })
    .max(10, { message: 'MAX_LENGTH_8' })
    .optional(),
})
