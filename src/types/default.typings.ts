import { Request } from 'express';
export interface DefaultSchema {
  createdAt: Date,
  updatedAt: Date,
  deleted: boolean,
  deletedAt: Date,
}

export interface GetAllPaginate {
  page: number;
  perPage: number;
}

export type AvailableModelsNames = 'user' |
  'bets' |
  'game'

export interface CustomRequestBody<T> extends Request {
  body: T
}
