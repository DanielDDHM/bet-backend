import * as z from "zod";

export const getGamesValidation = z.object({
  id: z.string()
    .min(3, { message: 'NOT_EMPTY' })
    .optional(),
}).strict();

export const createGamesValidation = z.object({
  name: z.string()
    .min(3, { message: 'NOT_EMPTY' }),
  ownerId: z.string()
    .min(3, { message: 'NOT_EMPTY' }),
  prize: z.string()
    .min(3, { message: 'NOT_EMPTY' }),
  sortDate: z.date()
}).strict();

export const updateGamesValidation = z.object({
  id: z.string()
    .min(2, { message: 'MIN_LENGHT_3' })
    .optional(),
  prize: z.string()
    .min(3, { message: 'NOT_EMPTY' })
    .optional(),
  sortDate: z.date()
    .optional()
}).strict();
