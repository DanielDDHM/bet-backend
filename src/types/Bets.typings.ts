import { UserInterface } from "./User.typings"
import { DefaultSchema } from './default.typings';

export interface BetsInterface extends DefaultSchema {
  details: object,
  value: string,
  winner: boolean,
  better: UserInterface,
  dateBet: Date,
  createdAt: Date,
  updatedAt: Date
  isActive: boolean,
  isConfirmed: boolean,
  isStaff: boolean
}
