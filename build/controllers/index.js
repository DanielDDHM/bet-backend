"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = exports.GamesController = exports.AddressController = exports.BetsController = exports.UsersController = void 0;
var users_controller_1 = require("./users.controller");
Object.defineProperty(exports, "UsersController", { enumerable: true, get: function () { return __importDefault(users_controller_1).default; } });
var bets_controller_1 = require("./bets.controller");
Object.defineProperty(exports, "BetsController", { enumerable: true, get: function () { return __importDefault(bets_controller_1).default; } });
var address_controller_1 = require("./address.controller");
Object.defineProperty(exports, "AddressController", { enumerable: true, get: function () { return __importDefault(address_controller_1).default; } });
var game_controller_1 = require("./game.controller");
Object.defineProperty(exports, "GamesController", { enumerable: true, get: function () { return __importDefault(game_controller_1).default; } });
var auth_controller_1 = require("./auth.controller");
Object.defineProperty(exports, "AuthController", { enumerable: true, get: function () { return __importDefault(auth_controller_1).default; } });
__exportStar(require("./internal.controller"), exports);
//# sourceMappingURL=index.js.map