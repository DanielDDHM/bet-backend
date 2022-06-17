"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiDocumentation = void 0;
const address_1 = require("./address");
const auth_1 = require("./auth");
const bets_1 = require("./bets");
const game_1 = require("./game");
const users_1 = require("./users");
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
            get: address_1.GET_ADDRESS,
        },
        "/v1/bets/get": {
            get: bets_1.GET_BETS,
        },
        "/v1/game/get": {
            get: game_1.GET_GAMES,
        },
        "/v1/users/get": {
            get: users_1.GET_USERS,
        },
        "/v1/auth/login": {
            post: auth_1.LOGIN,
        },
        "/v1/address/create": {
            post: address_1.CREATE_ADDRESS,
        },
        "/v1/bets/create": {
            post: bets_1.CREATE_BETS,
        },
        "/v1/game/create": {
            post: game_1.CREATE_GAMES,
        },
        "/v1/users/create": {
            post: users_1.CREATE_USERS,
        },
        "/v1/game/update/{id}": {
            put: game_1.UPDATE_GAMES
        },
        "/v1/users/update/{id}": {
            put: users_1.UPDATE_USERS
        },
        "/v1/internal/game/activate/{id}": {
            patch: game_1.ACTIVATE_GAMES
        },
        "/v1/internal/users/activate/{id}": {
            patch: users_1.ACTIVATE_USERS
        },
        "/v1/users/confirmAccount/{id}": {
            patch: users_1.CONFIRM_USERS
        },
        "/v1/internal/game/delete/{id}": {
            delete: game_1.DELETE_GAMES,
        },
        "/v1/internal/bets/delete/{id}": {
            delete: bets_1.DELETE_BETS,
        },
        "/v1/internal/users/delete/{id}": {
            delete: users_1.DELETE_USERS,
        }
    },
    components: {
        schemas: {
            LoginBody: auth_1.LoginBody,
            AddressBody: address_1.AddressBody,
            BetsBody: bets_1.BetsBody,
            GamesBody: game_1.GamesBody,
            UpdateGamesBody: game_1.UpdateGamesBody,
            UpdateUsersBody: users_1.UpdateUsersBody,
            UsersBody: users_1.UsersBody
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
exports.apiDocumentation = apiDocumentation;
//# sourceMappingURL=api.js.map