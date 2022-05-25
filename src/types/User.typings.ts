import { BetsInterface } from "./Bets.typings"
import { DefaultSchema } from './default.typings';

export interface UserInterface extends DefaultSchema {
  name: string,
  email: string,
  contact: object,
  address: object,
  password: string,
  photo: string,
  bets: BetsInterface,
  isActive: boolean,
  isConfirmed: boolean,
  isStaff: boolean,
}

export type UserParam = Omit<UserInterface,
  'id' |
  'createdAt' |
  'updatedAt' |
  'deleted' |
  'deletedAt'
>;
