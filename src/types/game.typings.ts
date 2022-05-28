export interface GamesGetDTO {
  id?: string
}

export interface GamesCreateDTO {
  name: string,
  ownerId: string,
  prize: string,
  sortDate: Date
}
