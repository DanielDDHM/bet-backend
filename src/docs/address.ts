import { DefaultMessages } from "../types";

const GET_ADDRESS = {
  tags: ['Address'],
  description: 'Get Address',
  security: [
    {
      Headers: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im5pY2siOiJ0ZXN0ZSIsIm1lc3NhZ2UiOiJJIEFURSBUSEUgQVNTIE9GIFdITydTIFJFQURJTkcifSwiaWF0IjoxNjU1MjQ0NDQ2LCJleHAiOjI1MTkyNDQ0NDZ9.7HEJBBm6bn7fk8OOwIdPIV2nNTzODwrArCPwNuxqPQU',
    },
  ],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/GetAddressBody',
        },
      },
    },
    required: true,
  },
  responses: {
    '200': {
      description: 'GET ADDRESS WITH SUCESS',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              streetNumber: { type: 'number' },
              zipCode: { type: 'string' },
              street: { type: 'string' },
              neighborhood: { type: 'string' },
              city: { type: 'string' },
              state: { type: 'string' },
              createdAt: { type: 'string' },
              updatedAt: { type: 'string' }
            },
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

const GetAddressBody = {
  type: 'object',
  properties: {
    zipCode: {
      type: 'string',
      example: '41310355',
    },
    streetNumber: {
      type: 'number',
      example: 68,
    },
  },
};

export { GET_ADDRESS, GetAddressBody };
