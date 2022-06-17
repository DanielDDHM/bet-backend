"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersBody = exports.UpdateUsersBody = exports.CONFIRM_USERS = exports.DELETE_USERS = exports.ACTIVATE_USERS = exports.UPDATE_USERS = exports.CREATE_USERS = exports.GET_USERS = void 0;
const types_1 = require("../types");
const GET_USERS = {
    tags: ['Users'],
    description: 'Get Users',
    operationId: 'getUsers',
    parameters: [
        {
            name: 'id',
            in: 'path',
            required: false,
            schema: {
                type: 'string',
                description: 'id',
                example: '62aaf4cf5a66de846e8990b2',
            }
        },
        {
            name: 'email',
            in: 'query',
            required: false,
            schema: {
                type: 'string',
                description: 'id',
                example: 'teste@teste.com.br',
            }
        },
        {
            name: 'nick',
            in: 'query',
            required: false,
            schema: {
                type: 'string',
                description: 'id',
                example: 'teste',
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
        },
        {
            name: 'role',
            in: 'req',
            required: true,
            schema: {
                type: 'string',
                description: 'role',
                example: 'ADMIN',
            }
        },
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
                            users: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        id: { type: 'string' },
                                        name: { type: 'string' },
                                        nick: { type: 'string' },
                                        email: { type: 'string' },
                                        phone: { type: 'string' },
                                        password: { type: 'string' },
                                        photo: { type: 'string' },
                                        isActive: { type: 'boolean' },
                                        isConfirmed: { type: 'boolean' },
                                        isStaff: { type: 'boolean' },
                                        addressId: { type: 'string' },
                                        createdAt: { type: 'string' },
                                        updatedAt: { type: 'string' }
                                    }
                                },
                                total: { type: 'number' },
                            },
                            message: { type: 'string' },
                        }
                    },
                },
            },
        },
        '500': {
            description: types_1.DefaultMessages.INTERNAL_SERVER_ERROR,
        },
    },
};
exports.GET_USERS = GET_USERS;
const CREATE_USERS = {
    tags: ['Users'],
    description: 'Create Users',
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/UsersBody',
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
            description: 'CREATE USERS WITH SUCESS',
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
                                    nick: { type: 'string' },
                                    email: { type: 'string' },
                                    phone: { type: 'string' },
                                    password: { type: 'string' },
                                    photo: { type: 'string' },
                                    isActive: { type: 'boolean' },
                                    isConfirmed: { type: 'boolean' },
                                    isStaff: { type: 'boolean' },
                                    addressId: { type: 'string' },
                                    createdAt: { type: 'string' },
                                    updatedAt: { type: 'string' }
                                }
                            },
                            message: { type: 'string' },
                        }
                    }
                }
            }
        },
        '500': {
            description: types_1.DefaultMessages.INTERNAL_SERVER_ERROR,
        },
    }
};
exports.CREATE_USERS = CREATE_USERS;
const UPDATE_USERS = {
    tags: ['Users'],
    description: 'Update Users',
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
                    $ref: '#/components/schemas/UpdateUsersBody',
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
            description: 'UPDATE USERS WITH SUCESS',
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
                                    nick: { type: 'string' },
                                    email: { type: 'string' },
                                    phone: { type: 'string' },
                                    password: { type: 'string' },
                                    photo: { type: 'string' },
                                    isActive: { type: 'boolean' },
                                    isConfirmed: { type: 'boolean' },
                                    isStaff: { type: 'boolean' },
                                    addressId: { type: 'string' },
                                    createdAt: { type: 'string' },
                                    updatedAt: { type: 'string' }
                                }
                            },
                            message: { type: 'string' },
                        }
                    }
                }
            }
        },
        '500': {
            description: types_1.DefaultMessages.INTERNAL_SERVER_ERROR,
        },
    },
};
exports.UPDATE_USERS = UPDATE_USERS;
const ACTIVATE_USERS = {
    tags: ['Users'],
    description: 'Activate Users',
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
                example: types_1.UserTypes.ADMIN,
            }
        }
    ],
    security: [
        { 'x-access-token': [] }
    ],
    responses: {
        '200': {
            description: 'ACTIVATE USERS WITH SUCESS',
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
            description: types_1.DefaultMessages.INTERNAL_SERVER_ERROR,
        },
    },
};
exports.ACTIVATE_USERS = ACTIVATE_USERS;
const CONFIRM_USERS = {
    tags: ['Users'],
    description: 'Confirm Users',
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
                example: types_1.UserTypes.ADMIN,
            }
        }
    ],
    security: [
        { 'x-access-token': [] }
    ],
    responses: {
        '200': {
            description: 'CONFIRM USERS WITH SUCESS',
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
            description: types_1.DefaultMessages.INTERNAL_SERVER_ERROR,
        },
    },
};
exports.CONFIRM_USERS = CONFIRM_USERS;
const DELETE_USERS = {
    tags: ['Users'],
    description: 'Delete Users',
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
                example: types_1.UserTypes.ADMIN,
            }
        }
    ],
    security: [
        { 'x-access-token': [] }
    ],
    responses: {
        '200': {
            description: 'DELETE USERS WITH SUCESS',
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
            description: types_1.DefaultMessages.INTERNAL_SERVER_ERROR,
        },
    },
};
exports.DELETE_USERS = DELETE_USERS;
const UsersBody = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            example: 'teste',
        },
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
        address: {
            type: 'object',
            properties: {
                zipCode: {
                    type: 'string',
                    example: '41310355',
                },
                password: {
                    type: 'number',
                    example: '69',
                },
            }
        }
    },
};
exports.UsersBody = UsersBody;
const UpdateUsersBody = {
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
        }
    },
};
exports.UpdateUsersBody = UpdateUsersBody;
//# sourceMappingURL=users.js.map