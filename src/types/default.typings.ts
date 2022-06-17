import * as z from 'zod';
import {
  DeleteGenericValidation,
  LoginValidation,
  VerifyValidation
} from '../validations';

export type Verify = z.infer<typeof VerifyValidation>

export type Login = z.infer<typeof LoginValidation>

export type GenericDeleteDTO = z.infer<typeof DeleteGenericValidation>

export interface CheckTokenResponse {
  data: {
    nick: string,
    message: string
  },
  iat: number,
  exp: number
}
