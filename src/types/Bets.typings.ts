export interface BetsGetDTO {
  usersId?: string,
  gameId?: string,
}

export interface BetsCreateDTO {
  usersId: string,
  gameId: string,
  value: string,
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

