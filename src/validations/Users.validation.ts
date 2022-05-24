import * as z from "zod";

export const usersValidation = z.object({
  name: z.string().nonempty({ message: 'NON_EMPTY' }).min(2, { message: 'MIN_LENGHT_3' }).max(10, { message: 'MAX_LENGTH_10' }),
  email: z.string()
    .regex(new RegExp(/^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/))
    .nonempty({ message: 'NON_EMPTY' }),
  password: z.string().nonempty({ message: 'NON_EMPTY' }),
  photo: z.string().optional(),
}).strict();
