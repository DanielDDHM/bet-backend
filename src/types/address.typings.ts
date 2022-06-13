import * as z from 'zod';
import {
  createAddressValidation,
  getAddressValidation
} from '../validations';

export type AddressGetDTO = z.infer<typeof getAddressValidation>

export type AddressCreateDTO = z.infer<typeof createAddressValidation>

