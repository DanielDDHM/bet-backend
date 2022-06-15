import {
  GET_ADDRESS,
  CREATE_ADDRESS,
  AddressBody
} from "./address";
import { LOGIN, LoginBody } from "./auth";
import { CREATE_BETS, GET_BETS, BetsBody, DELETE_BETS } from "./bets";

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
      url: 'http://localhost:3000/',
      description: 'Local Server',
    },
    {
      url: 'http://localhost:4000/',
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
    "/v1/auth/login": {
      post: LOGIN,
    },
    "/v1/address/create": {
      post: CREATE_ADDRESS,
    },
    "/v1/bets/create": {
      post: CREATE_BETS,
    },
    "/v1/internal/bets/delete/{id}": {
      delete: DELETE_BETS,
    },
  },
  components: {
    schemas: {
      LoginBody,
      AddressBody,
      BetsBody
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
