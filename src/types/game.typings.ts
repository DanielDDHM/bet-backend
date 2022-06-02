export interface GamesGetDTO {
  id?: string,
  page?: number,
  perPage?: number
}

export interface GamesCreateDTO {
  name: string,
  ownerId: string,
  prize: string,
  sortDate: Date
}

export interface GamesUpdateDTO {
  id?: string
  prize?: string,
  sortDate?: Date,
  winner?: string,
  prizePhoto?: string,
  isActive?: boolean
}
