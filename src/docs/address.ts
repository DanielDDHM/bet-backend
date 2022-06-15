import { DefaultMessages } from "../types";

const GET_ADDRESS = {
  tags: ['Address'],
  description: 'Get Address',
  operationId: "getAddress",
  parameters: [
    {
      name: "zipCode",
      in: "query",
      required: true,
      schema: {
        type: "string",
        description: "ZipCode",
        example: "41310355",
      }
    },
    {
      name: "streetNumber",
      in: "query",
      required: true,
      schema: {
        type: "number",
        description: "ZipCode",
        example: 68,
      }
    }
  ],
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


const CREATE_ADDRESS = {
  tags: ['Address'],
  description: 'Create Address',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/AddressBody',
        },
      },
    },
    required: true,
  },

  responses: {
    '200': {
      description: 'CREATE ADDRESS WITH SUCESS',
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
    '500': {
      description: DefaultMessages.INTERNAL_SERVER_ERROR,
    },
  },
};


const AddressBody = {
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

export {
  GET_ADDRESS,
  CREATE_ADDRESS,
  AddressBody
};
