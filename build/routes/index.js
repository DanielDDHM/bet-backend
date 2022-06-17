"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_routes_1 = __importDefault(require("./users.routes"));
const bets_routes_1 = __importDefault(require("./bets.routes"));
const game_routes_1 = __importDefault(require("./game.routes"));
const address_routes_1 = __importDefault(require("./address.routes"));
const internal_routes_1 = __importDefault(require("./internal.routes"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const rootRoutes = express_1.default.Router();
rootRoutes.use('/auth', auth_routes_1.default);
rootRoutes.use('/users', users_routes_1.default);
rootRoutes.use('/bets', bets_routes_1.default);
rootRoutes.use('/game', game_routes_1.default);
rootRoutes.use('/address', address_routes_1.default);
rootRoutes.use('/internal', internal_routes_1.default);
exports.default = rootRoutes;
//# sourceMappingURL=index.js.map