import * as z from 'zod';
import {
  betsCreateValidation,
  getBetsValidation
} from '../validations';

export type BetsGetDTO = z.infer<typeof getBetsValidation>

export type BetsCreateDTO = z.infer<typeof betsCreateValidation>

