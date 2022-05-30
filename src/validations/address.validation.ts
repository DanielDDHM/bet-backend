import * as z from "zod";

export const getAddressValidation = z.object({
  zipCode: z.string()
    .min(1, { message: 'NOT_EMPTY' }),
  streetNumber: z.number()
    .nonnegative({ message: 'NON_NEGATIVE' })
    .min(3, { message: 'NOT_EMPTY' })
}).strict();

export const createAddressValidation = z.object({
  zipCode: z.string()
    .min(3, { message: 'NOT_EMPTY' }),
  streetNumber: z.number()
    .nonnegative({ message: 'NON_NEGATIVE' })
    .min(1, { message: 'NOT_EMPTY' }),
  street: z.string()
    .min(3, { message: 'NOT_EMPTY' })
    .optional(),
  neighborhood: z.string()
    .min(3, { message: 'NOT_EMPTY' })
    .optional(),
  city: z.string()
    .min(3, { message: 'NOT_EMPTY' })
    .optional(),
  state: z.string()
    .min(1, { message: 'NOT_EMPTY' })
    .optional(),
}).strict();

export const updateAddressValidation = z.object({
  id: z.string()
    .min(2, { message: 'MIN_LENGHT_3' })
    .optional(),
  zipCode: z.string()
    .min(3, { message: 'NOT_EMPTY' })
    .optional(),
  streetNumber: z.number()
    .nonnegative({ message: 'NON_NEGATIVE' })
    .min(1, { message: 'NOT_EMPTY' })
    .optional(),
  street: z.string()
    .min(3, { message: 'NOT_EMPTY' })
    .optional(),
  neighborhood: z.string()
    .min(3, { message: 'NOT_EMPTY' })
    .optional(),
  city: z.string()
    .min(3, { message: 'NOT_EMPTY' })
    .optional(),
  state: z.string()
    .min(1, { message: 'NOT_EMPTY' })
    .optional(),
}).strict();
