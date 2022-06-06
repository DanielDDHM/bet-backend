export interface BetsGetDTO {
  usersId?: string,
  gameId?: string,
  page?: number,
  perPage?: number
}

export interface BetsCreateDTO {
  usersId: string,
  gameId: string,
  value: string,
}

export interface BetsDeleteDTO {
  id?: string,
}


