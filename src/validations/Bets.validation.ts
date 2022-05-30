import * as z from "zod";

export const getBetsValidation = z.object({
  usersId: z.string()
    .min(3, { message: 'NOT_EMPTY' })
    .optional(),
  gameId: z.string()
    .min(3, { message: 'NOT_EMPTY' })
    .optional(),
}).strict();

export const betsCreateValidation = z.object({
  usersId: z.string()
    .min(3, { message: 'NOT_EMPTY' }),
  gameId: z.string()
    .min(3, { message: 'NOT_EMPTY' }),
  value: z.string()
    .min(1, { message: 'NOT_EMPTY' }),
}).strict();

export const betsDeleteValidation = z.object({
  id: z.string()
    .min(2, { message: 'MIN_LENGHT_3' })
    .optional(),
}).strict();
