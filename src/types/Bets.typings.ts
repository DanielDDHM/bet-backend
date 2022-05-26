import { DefaultSchema } from './default.typings';

export interface BetsInterface extends DefaultSchema {
  details: object,
  value: string,
  winner: boolean,
  dateBet: Date,
  createdAt: Date,
  updatedAt: Date
}
