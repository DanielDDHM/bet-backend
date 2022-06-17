import {
  GET_ADDRESS,
  CREATE_ADDRESS,
  AddressBody
} from "./address";
import { LOGIN, LoginBody } from "./auth";
import { CREATE_BETS, GET_BETS, DELETE_BETS, BetsBody } from "./bets";
import {
  CREATE_GAMES, GET_GAMES, UPDATE_GAMES, ACTIVATE_GAMES, DELETE_GAMES,
  GamesBody, UpdateGamesBody,
} from "./game";
import {
  ACTIVATE_USERS, CREATE_USERS, DELETE_USERS, GET_USERS, UPDATE_USERS,
  UpdateUsersBody, UsersBody, CONFIRM_USERS
} from "./users";

const apiDocumentation = {
  openapi: "3.0.3",
  info: {
    title: "BET",
    description: "API for a bet animal game",
    version: "1.0.0",
    contact: {
      email: "daniel.ddhm@gmail.com",
    },
  },
  servers: [
    {
      url: 'http://localhost:4000/',
      description: 'Test Server',
    },
    {
      url: 'http://localhost:3000/',
      description: 'Local Server',
    },
    {
      url: 'https://animalbet.herokuapp.com/',
      description: 'Prod Server',
    }
  ],
  tags: [
    { name: 'Auth' },
    { name: 'Address' },
    { name: 'Bets' },
    { name: 'Games' },
    { name: 'Users' },
  ],

  paths: {
    "/v1/address/get": {
      get: GET_ADDRESS,
    },
    "/v1/bets/get": {
      get: GET_BETS,
    },
    "/v1/game/get": {
      get: GET_GAMES,
    },
    "/v1/users/get": {
      get: GET_USERS,
    },
    "/v1/auth/login": {
      post: LOGIN,
    },
    "/v1/address/create": {
      post: CREATE_ADDRESS,
    },
    "/v1/bets/create": {
      post: CREATE_BETS,
    },
    "/v1/game/create": {
      post: CREATE_GAMES,
    },
    "/v1/users/create": {
      post: CREATE_USERS,
    },
    "/v1/game/update/{id}": {
      put: UPDATE_GAMES
    },
    "/v1/users/update/{id}": {
      put: UPDATE_USERS
    },
    "/v1/internal/game/activate/{id}": {
      patch: ACTIVATE_GAMES
    },
    "/v1/internal/users/activate/{id}": {
      patch: ACTIVATE_USERS
    },
    "/v1/users/confirmAccount/{id}": {
      patch: CONFIRM_USERS
    },
    "/v1/internal/game/delete/{id}": {
      delete: DELETE_GAMES,
    },
    "/v1/internal/bets/delete/{id}": {
      delete: DELETE_BETS,
    },
    "/v1/internal/users/delete/{id}": {
      delete: DELETE_USERS,
    }
  },
  components: {
    schemas: {
      LoginBody,
      AddressBody,
      BetsBody,
      GamesBody,
      UpdateGamesBody,
      UpdateUsersBody,
      UsersBody
    },
    securitySchemes: {
      'x-access-token': {
        type: 'apiKey',
        in: 'header',
        name: 'x-access-token',
      }
    },
  },
};

export { apiDocumentation };
