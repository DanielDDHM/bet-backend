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
    .min(3, { message: 'NOT_EMPTY' }),
  neighborhood: z.string()
    .min(3, { message: 'NOT_EMPTY' }),
  city: z.string()
    .min(3, { message: 'NOT_EMPTY' }),
  state: z.string()
    .min(1, { message: 'NOT_EMPTY' }),
}).strict();
