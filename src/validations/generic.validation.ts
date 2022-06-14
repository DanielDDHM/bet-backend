import * as z from "zod";
export const VerifyValidation = z.object({
  role: z.string()
    .min(1, { message: 'NOT_EMPTY' }),
  nick: z.string()
    .min(3, { message: 'NOT_EMPTY' }),
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
    .min(3, { message: 'NOT_EMPTY' }),
  email: z.string()
    .min(2, { message: 'NON_EMPTY' }),
  password: z.string()
    .min(2, { message: 'NON_EMPTY' })
    .max(10, { message: 'MAX_LENGTH_8' }),
}).strict();

export const DeleteGenericValidation = z.object({
  id: z.string()
    .min(2, { message: 'MIN_LENGHT_3' }),
  role: z.string()
    .min(1, { message: 'NOT_EMPTY' }),
}).strict();
