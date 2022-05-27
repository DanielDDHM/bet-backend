import * as z from "zod";

export const getUserValidation = z.object({
  nick: z.string()
    .min(2, { message: 'MIN_LENGHT_3' })
    .max(8, { message: 'MAX_LENGTH_8' }),
  email: z.string()
    .min(2, { message: 'NON_EMPTY' }),
}).strict();

export const createUserValidation = z.object({
  name: z.string()
    .min(2, { message: 'MIN_LENGHT_3' })
    .max(10, { message: 'MAX_LENGTH_10' }),
  nick: z.string()
    .min(2, { message: 'MIN_LENGHT_3' })
    .max(8, { message: 'MAX_LENGTH_8' }),
  email: z.string()
    .min(2, { message: 'NON_EMPTY' }),
  password: z.string()
    .min(2, { message: 'NON_EMPTY' })
    .max(10, { message: 'MAX_LENGTH_8' }),
  photo: z.string()
    .min(2, { message: 'MIN_LENGHT_3' }).optional(),
  contact: z.object({
    phone: z.string()
      .min(2, { message: 'NON_EMPTY' })
  }),
  address: z.object({
    zipCode: z.string()
      .min(2, { message: 'NON_EMPTY' }),
    streetNumber: z.number()
      .nonnegative({ message: 'NON_NEGATIVE' })
      .min(2, { message: 'NON_EMPTY' }),
    street: z.string()
      .min(2, { message: 'NON_EMPTY' })
      .optional(),
    neighboorhood: z.string()
      .min(2, { message: 'NON_EMPTY' })
      .optional(),
    city: z.string()
      .min(2, { message: 'NON_EMPTY' })
      .max(10, { message: 'MAX_LENGTH_8' })
      .optional(),
    state: z.string()
      .min(2, { message: 'NON_EMPTY' })
      .max(3, { message: 'MAX_LENGTH_3' })
      .optional(),
  }),
  isActive: z.boolean().optional(),
  isConfirmed: z.boolean().optional(),
  isStaff: z.boolean().optional(),
}).strict();
