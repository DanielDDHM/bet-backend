const LOGIN = {
  tags: ['Auth'],
  description: 'Login using a JWT',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/LoginBody',
        },
      },
    },
    required: true,
  },
  responses: {
    '200': {
      description: 'LOGIN WITH SUCCESS',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              auth: {
                type: 'boolean',
              },
              token: {
                type: 'string',
              },
            },
          },
        },
      },
    },
    '400': {
      description: 'WRONG DATA',
    },
    '404': {
      description: 'USER DOESNT EXISTS',
    },
    '500': {
      description: 'INTERNAL_SERVER_ERROR',
    },
  },
};

const LoginBody = {
  type: 'object',
  properties: {
    nick: {
      type: 'string',
      example: 'teste',
    },
    email: {
      type: 'string',
      example: 'teste@teste.com.br',
    },
    password: {
      type: 'string',
      example: 'teste',
    },
  },
};

export { LOGIN, LoginBody };
