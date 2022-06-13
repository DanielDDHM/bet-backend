import * as z from 'zod';
import {
  LoginValidation,
  VerifyValidation
} from '../validations';

export type Verify = z.infer<typeof VerifyValidation>

export type Login = z.infer<typeof LoginValidation>

export interface GenericDeleteDTO {
  id?: string,
  role?: string
}
