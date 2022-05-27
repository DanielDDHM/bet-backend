import { DefaultSchema } from './default.typings';

export interface BetsCreateDTO extends DefaultSchema {
  details: object,
  value: string,
  winner: boolean,
  dateBet: Date,
  createdAt: Date,
  updatedAt: Date
}

//TODO: terminar tipagens
export interface BetsUpdateDTO {
  email: string,
}
export interface BetsDeleteDTO {
  email: string,
}

export interface BetsPatchDTO {
  email: string,
}

export interface BetsGetDTO {
  email: string,
}
