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
