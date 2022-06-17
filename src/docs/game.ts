import { DefaultMessages, UserTypes } from '../types';

const GET_GAMES = {
  tags: ['Games'],
  description: 'Get Games',
  operationId: 'getGames',
  parameters: [
    {
      name: 'id',
      in: 'path',
      required: false,
      schema: {
        type: 'string',
        description: 'id',
        example: '',
      }
    },
    {
      name: 'page',
      in: 'query',
      required: false,
      schema: {
        type: 'number',
        description: 'page',
      }
    },
    {
      name: 'perPage',
      in: 'query',
      required: false,
      schema: {
        type: 'number',
        description: 'perPage',
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
              games: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    winner: { type: 'array', items: { type: 'string' } },
                    sortDate: { type: 'string' },
                    numbers: { type: 'number', example: 24 },
                    prize: { type: 'string' },
                    prizePhoto: { type: 'string' },
                    isActive: { type: 'boolean' },
                    createdAt: { type: 'string' },
                    updatedAt: { type: 'string' },
                    ownerId: { type: 'string' }
                  }
                },
                total: { type: 'number' },
                page: { type: 'number' },
                perPage: { type: 'number' },
              },
              message: { type: 'string' },
            }
          },
        },
      },
    },
    '201': {
      description: 'GET BET WITH SUCESS',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              winner: { type: 'array', items: { type: 'string' } },
              sortDate: { type: 'string' },
              numbers: { type: 'number', example: 24 },
              prize: { type: 'string' },
              prizePhoto: { type: 'string' },
              isActive: { type: 'boolean' },
              createdAt: { type: 'string' },
              updatedAt: { type: 'string' },
              ownerId: { type: 'string' }
            }
          },
        },
      },
    },
    '500': {
      description: DefaultMessages.INTERNAL_SERVER_ERROR,
    },
  },
};

const CREATE_GAMES = {
  tags: ['Games'],
  description: 'Create Games',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/GamesBody',
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
      description: 'CREATE GAMES WITH SUCESS',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  name: { type: 'string' },
                  winner: { type: 'array', items: { type: 'string' } },
                  sortDate: { type: 'string' },
                  numbers: { type: 'number', example: 24 },
                  prize: { type: 'string' },
                  prizePhoto: { type: 'string' },
                  isActive: { type: 'boolean' },
                  createdAt: { type: 'string' },
                  updatedAt: { type: 'string' },
                  ownerId: { type: 'string' }
                }
              },
              message: { type: 'string' },
            }
          },
        },
      },
    },
    '500': {
      description: DefaultMessages.INTERNAL_SERVER_ERROR,
    },
  },
};

const UPDATE_GAMES = {
  tags: ['Games'],
  description: 'Update Games',
  parameters: [
    {
      name: 'id',
      in: 'path',
      required: true,
      schema: {
        type: 'string',
        description: 'id',
        example: '62ab2643fd2599845ad8102a',
      }
    },
  ],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/UpdateGamesBody',
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
      description: 'UPDATE GAMES WITH SUCESS',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  name: { type: 'string' },
                  winner: { type: 'array', items: { type: 'string' } },
                  sortDate: { type: 'string' },
                  numbers: { type: 'number', example: 24 },
                  prize: { type: 'string' },
                  prizePhoto: { type: 'string' },
                  isActive: { type: 'boolean' },
                  createdAt: { type: 'string' },
                  updatedAt: { type: 'string' },
                  ownerId: { type: 'string' }
                }
              },
              message: { type: 'string' },
            }
          },
        },
      },
    },
    '500': {
      description: DefaultMessages.INTERNAL_SERVER_ERROR,
    },
  },
};

const ACTIVATE_GAMES = {
  tags: ['Games'],
  description: 'Activate Games',
  parameters: [
    {
      name: 'id',
      in: 'path',
      required: true,
      schema: {
        type: 'string',
        description: 'id',
        example: '62ab2643fd2599845ad8102a',
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
      description: 'UPDATE GAMES WITH SUCESS',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  Status: { type: 'boolean' },
                  updatedAt: { type: 'string' }
                }
              },
              message: { type: 'string' },
            }
          },
        },
      },
    },
    '500': {
      description: DefaultMessages.INTERNAL_SERVER_ERROR,
    },
  },
};

const DELETE_GAMES = {
  tags: ['Games'],
  description: 'Delete Games',
  parameters: [
    {
      name: 'id',
      in: 'path',
      required: true,
      schema: {
        type: 'string',
        description: 'id - not use the 62ab2643fd2599845ad8102a',
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
      description: 'DELETE GAMES WITH SUCESS',
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
    '500': {
      description: DefaultMessages.INTERNAL_SERVER_ERROR,
    },
  },
};

const GamesBody = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      example: 'teste',
    },
    prize: {
      type: 'string',
      example: '10000',
    },
    sortDate: {
      type: 'string',
      example: '06/14/2023',
    },
    ownerId: {
      type: 'string',
      example: '62aaf4cf5a66de846e8990b2',
    },
    numbers: {
      type: 'number',
      example: 24,
    }
  },
};

const UpdateGamesBody = {
  type: 'object',
  properties: {
    winner: {
      type: 'string',
      example: '62aaf4cf5a66de846e8990b2',
    },
    prize: {
      type: 'string',
      example: '10000',
    },
    sortDate: {
      type: 'string',
      example: '06/14/2023',
    }
  },
};

export {
  GET_GAMES,
  CREATE_GAMES,
  UPDATE_GAMES,
  ACTIVATE_GAMES,
  DELETE_GAMES,
  UpdateGamesBody,
  GamesBody,
};
