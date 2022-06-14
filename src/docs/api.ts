import { GET_ADDRESS, GetAddressBody } from "./address";
import { LOGIN, LoginBody } from "./auth";

const apiDocumentation = {
  openapi: "3.0.3",
  info: {
    title: "BET", // short title.
    description: "API for a bet animal game", //  desc.
    version: "1.0.0", // version number
    contact: {
      email: "daniel.ddhm@gmail.com", // your email
    },
  },
  servers: [
    {
      url: 'http://localhost:3000/',
      description: 'Local Server',
    }
  ],
  tags: [
    { name: 'Auth' },
    { name: 'Users' },
    { name: 'Bets' },
    { name: 'Games' },
    { name: 'Address' },
  ],

  paths: {
    "/v1/auth/login": {
      post: LOGIN,
    },
    "/v1/address/get": {
      get: GET_ADDRESS,
    }
  },
  components: {
    schemas: {
      LoginBody,
      GetAddressBody
    },
    securitySchemes: {
      Auth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    // TODO: Corrigir o scheme pra pegar Header
  },
};

export { apiDocumentation };
