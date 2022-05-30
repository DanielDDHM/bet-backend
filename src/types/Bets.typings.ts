export interface BetsGetDTO {
  usersId?: string,
  gameId?: string,
}

export interface BetsCreateDTO {
  usersId: string,
  gameId: string,
  value: string,
}

export interface BetsDeleteDTO {
  id?: string,
}


