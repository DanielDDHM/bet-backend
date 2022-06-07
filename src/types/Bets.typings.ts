import { GetAllPaginate } from "./default.typings";

export interface BetsGetDTO extends GetAllPaginate {
  usersId?: string,
  gameId?: string,
  role?: string
}

export interface BetsCreateDTO {
  usersId: string,
  bet: number,
  gameId: string,
  value: string,
}


