export interface GamesGetDTO {
  id?: string
}

export interface GamesCreateDTO {
  name: string,
  usersId: string,
  prize: string,
  sortDate: Date
}
