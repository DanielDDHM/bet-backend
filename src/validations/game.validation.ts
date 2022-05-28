import * as z from "zod";

export const getGamesValidation = z.object({
  id: z.string()
    .min(3, { message: 'NOT_EMPTY' })
    .optional(),
}).strict();

export const createGamesValidation = z.object({
  name: z.string()
    .min(3, { message: 'NOT_EMPTY' }),
  usersId: z.string()
    .min(3, { message: 'NOT_EMPTY' }),
  prize: z.string()
    .min(3, { message: 'NOT_EMPTY' }),
  sortDate: z.date()
}).strict();
