import * as z from "zod";

export const getBetsValidation = z.object({
  usersId: z.string()
    .min(3, { message: 'NOT_EMPTY' })
    .optional(),
  gameId: z.string()
    .min(3, { message: 'NOT_EMPTY' })
    .optional(),
  page: z.number()
    .nonnegative()
    .optional(),
  perPage: z.number()
    .nonnegative()
    .optional(),
  role: z.string()
    .min(1, { message: 'NOT_EMPTY' }),
}).strict();

export const betsCreateValidation = z.object({
  usersId: z.string()
    .min(3, { message: 'NOT_EMPTY' }),
  bet: z.number()
    .nonnegative({ message: 'NOT_NEGATIVE' })
    .min(1, { message: 'NOT_EMPTY' }),
  gameId: z.string()
    .min(3, { message: 'NOT_EMPTY' }),
  value: z.string()
    .min(1, { message: 'NOT_EMPTY' }),
  nick: z.string()
    .min(3, { message: 'NOT_EMPTY' }),
}).strict();

export const betsDeleteValidation = z.object({
  id: z.string()
    .min(2, { message: 'MIN_LENGHT_3' }),
  role: z.string()
    .min(1, { message: 'NOT_EMPTY' }),
}).strict();
