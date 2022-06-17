"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = exports.GameService = exports.AddressService = exports.BetService = exports.UserService = void 0;
var users_service_1 = require("./users.service");
Object.defineProperty(exports, "UserService", { enumerable: true, get: function () { return __importDefault(users_service_1).default; } });
var bets_service_1 = require("./bets.service");
Object.defineProperty(exports, "BetService", { enumerable: true, get: function () { return __importDefault(bets_service_1).default; } });
var address_service_1 = require("./address.service");
Object.defineProperty(exports, "AddressService", { enumerable: true, get: function () { return __importDefault(address_service_1).default; } });
var game_service_1 = require("./game.service");
Object.defineProperty(exports, "GameService", { enumerable: true, get: function () { return __importDefault(game_service_1).default; } });
var auth_service_1 = require("./auth.service");
Object.defineProperty(exports, "AuthService", { enumerable: true, get: function () { return __importDefault(auth_service_1).default; } });
//# sourceMappingURL=index.js.map