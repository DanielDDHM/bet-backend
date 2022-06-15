import { DefaultMessages, UserTypes } from "../types";

const GET_BETS = {
  tags: ['Bets'],
  description: 'Get Bets',
  operationId: "getBets",
  parameters: [
    {
      name: "usersId",
      in: "query",
      required: false,
      schema: {
        type: "string",
        description: "usersId",
        example: "",
      }
    },
    {
      name: "gameId",
      in: "query",
      required: false,
      schema: {
        type: "number",
        description: "gameId",
      },
      example: "",
    },
    {
      name: "page",
      in: "query",
      required: false,
      schema: {
        type: "number",
        description: "page",
      }
    },
    {
      name: "perPage",
      in: "query",
      required: false,
      schema: {
        type: "number",
        description: "perPage",
      }
    },
    {
      name: "role",
      in: "req",
      required: true,
      schema: {
        type: "string",
        description: "role",
        example: UserTypes.ADMIN,
      }
    }
  ],
  security: [
    { 'x-access-token': [] }
  ],
  responses: {
    '200': {
      description: 'GET BET WITH SUCESS',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: {
                type: 'object',
                bets: { type: 'array' },
                Total: { type: 'number' },
              },
              message: { type: 'string' },
            }
          },
        },
      },
    },
    '404': {
      description: DefaultMessages.ADDRESS_NOT_FOUND,
    },
    '500': {
      description: DefaultMessages.INTERNAL_SERVER_ERROR,
    },
  },
};


const CREATE_BETS = {
  tags: ['Bets'],
  description: 'Create Bets',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/BetsBody',
        },
      },
    },
    required: true,
  },
  security: [
    { 'x-access-token': [] }
  ],
  responses: {
    '200': {
      description: 'CREATE BETS WITH SUCESS',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              value: { type: 'string' },
              bet: { type: 'number' },
              status: { type: 'string' },
              winner: { type: 'boolean' },
              usersId: { type: 'string' },
              gameId: { type: 'boolean' },
              createdAt: { type: 'string' },
              updatedAt: { type: 'string' },
              message: { type: 'string' }
            },
          },
        },
      },
    },
    '500': {
      description: DefaultMessages.INTERNAL_SERVER_ERROR,
      content: {
        type: 'string',
        properties: {
          error: 'string'
        }
      }
    },
  },
};

const DELETE_BETS = {
  tags: ['Bets'],
  description: 'Delete Bets',
  operationId: "deleteBets",
  parameters: [
    {
      name: "id",
      in: "path",
      required: true,
      schema: {
        type: "string",
        description: "id",
      }
    },
    {
      name: "role",
      in: "req",
      required: true,
      schema: {
        type: "string",
        description: "role",
        example: UserTypes.ADMIN,
      }
    }
  ],
  security: [
    { 'x-access-token': [] }
  ],
  responses: {
    '200': {
      description: 'DELETE BETS WITH SUCESS',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: { type: 'string' },
            }
          },
        },
      },
    },
    '404': {
      description: DefaultMessages.ADDRESS_NOT_FOUND,
    },
    '500': {
      description: DefaultMessages.INTERNAL_SERVER_ERROR,
    },
  },
};

const BetsBody = {
  type: 'object',
  properties: {
    usersId: {
      type: 'string',
      example: '62a85fab4388090db5a93b45',
    },
    bet: {
      type: 'number',
      example: 68,
    },
    gameId: {
      type: 'string',
      example: '62a8c454a07d46691ace262a',
    },
    value: {
      type: 'string',
      example: '100',
    }
  },
};

export {
  GET_BETS,
  CREATE_BETS,
  DELETE_BETS,
  BetsBody,
};
