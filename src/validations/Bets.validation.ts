import * as z from "zod";

export const betsCreateValidation = z.object({
  value: z.string().nonempty({ message: 'NON_EMPTY' }).max(10, { message: 'MAX_LENGTH_10' }),
  winner: z.boolean().optional(),
  dateBet: z.date(),
}).strict();
