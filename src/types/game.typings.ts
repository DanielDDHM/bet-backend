import { GetAllPaginate, Verify } from "./default.typings"

export interface GamesGetDTO extends GetAllPaginate {
  id?: string,
}

export interface GamesCreateDTO {
  name: string,
  ownerId: string,
  prize: string,
  sortDate: Date
}

export interface GamesUpdateDTO extends Verify {
  id?: string
  prize?: string,
  sortDate?: Date,
  winner?: string,
  prizePhoto?: string,
  isActive?: boolean
}
