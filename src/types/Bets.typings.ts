import { DefaultSchema } from './default.typings';

export interface BetsGetDTO {
  usersId?: string,
  gameId?: string,
}

export interface BetsCreateDTO extends DefaultSchema {
  usersId: string,
  gameId: string,
  value: string,
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

