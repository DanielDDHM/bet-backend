import * as z from "zod";

export const betsCreateValidation = z.object({
  usersId: z.string()
    .min(3, { message: 'NOT_EMPTY' }),
  gameId: z.string()
    .min(3, { message: 'NOT_EMPTY' }),
  value: z.string()
    .min(1, { message: 'NOT_EMPTY' }),
}).strict();
