import { Verify } from "./default.typings"
import * as z from 'zod';
import {
  activateUserValidation,
  createGamesValidation,
  getGamesValidation,
  sortValidation,
  updateGamesValidation
} from "../validations";

export type GamesGetDTO = z.infer<typeof getGamesValidation>

export type GamesCreateDTO = z.infer<typeof createGamesValidation> & Verify

export type GamesUpdateDTO = z.infer<typeof updateGamesValidation> & Verify

export type GameActivateDTO = z.infer<typeof activateUserValidation>

export type GameSortDTO = z.infer<typeof sortValidation>
