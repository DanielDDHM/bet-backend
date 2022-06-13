import { AddressCreateDTO, AddressGetDTO } from "./address.typings"
import { BetsCreateDTO, BetsGetDTO } from "./bets.typings"
import { GenericDeleteDTO } from "./default.typings"
import { GameActivateDTO, GamesCreateDTO, GamesGetDTO, GamesUpdateDTO } from "./game.typings"
import {
  UserActivateDTO,
  UserAddressDTO,
  UserConfirmDTO,
  UserCreateDTO,
  UserDeleteDTO,
  UserGetDTO,
  UserUpdateDTO
} from "./user.typings"

export type UserParams = UserCreateDTO |
  UserGetDTO | UserUpdateDTO | UserDeleteDTO | UserAddressDTO | UserActivateDTO | UserConfirmDTO

export type GameParams = GamesCreateDTO |
  GamesGetDTO | GamesUpdateDTO | GameActivateDTO | GenericDeleteDTO

export type BetParams = BetsCreateDTO | BetsGetDTO | GenericDeleteDTO

export type AddressParams = AddressCreateDTO | AddressGetDTO | GenericDeleteDTO

