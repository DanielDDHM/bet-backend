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

export interface Login {
  nick: string,
  email: string,
  password: string,
}

export enum UserTypes {
  ADMIN = 'ADMIN',
  USER = 'USER',
  OWNER = 'OWNER'
}

