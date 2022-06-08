export interface GetAllPaginate {
  page?: number,
  perPage?: number
}

export interface Verify {
  role?: string
  nick?: string
}
export interface Login {
  nick?: string,
  email?: string,
  password?: string,
}

export enum UserTypes {
  ADMIN = 'ADMIN',
  USER = 'USER',
  OWNER = 'OWNER'
}

export interface GenericDeleteDTO {
  id?: string,
  role?: string
}
