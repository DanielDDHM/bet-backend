import {
  activateUserValidation,
  confirmUserValidation,
  createUserValidation,
  deleteUserValidation,
  getAddressValidation,
  getUserValidation,
  userUpdateValidation
} from "../validations";
import { Verify } from "./default.typings";
import * as z from 'zod';

export type UserCreateDTO = z.infer<typeof createUserValidation>;

export type UserGetDTO = z.infer<typeof getUserValidation>;

export type UserUpdateDTO = z.infer<typeof userUpdateValidation> & Verify;

export type UserDeleteDTO = z.infer<typeof deleteUserValidation> & Verify;

export type UserAddressDTO = z.infer<typeof getAddressValidation>

export type UserConfirmDTO = z.infer<typeof confirmUserValidation>

export type UserActivateDTO = z.infer<typeof activateUserValidation>;
