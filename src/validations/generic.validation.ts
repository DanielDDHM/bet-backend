import * as z from "zod";
export const VerifyValidation = z.object({
  nick: z.string()
    .min(3, { message: 'NOT_EMPTY' })
    .optional(),
  role: z.string()
    .min(3, { message: 'NOT_EMPTY' })
    .optional(),
})

export const PaginateValidation = z.object({
  page: z.number()
    .nonnegative()
    .optional(),
  perPage: z.number()
    .nonnegative()
    .optional()
})
