"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const middleware_1 = require("../middleware");
const router = express_1.default.Router();
router.patch('/users/activate/:id', new middleware_1.CheckTokenMiddleware().verifyToken, new middleware_1.CheckRoleMiddleware().checkRole, new controllers_1.InternalUsersController().activate);
router.delete('/users/delete/:id', new middleware_1.CheckTokenMiddleware().verifyToken, new middleware_1.CheckRoleMiddleware().checkRole, new controllers_1.InternalUsersController().delete);
router.delete('/bets/delete/:id', new middleware_1.CheckTokenMiddleware().verifyToken, new middleware_1.CheckRoleMiddleware().checkRole, new controllers_1.InternalBetsController().delete);
router.patch('/game/activate/:id', new middleware_1.CheckTokenMiddleware().verifyToken, new middleware_1.CheckRoleMiddleware().checkRole, new controllers_1.InternalGameController().activate);
router.delete('/game/delete/:id', new middleware_1.CheckTokenMiddleware().verifyToken, new middleware_1.CheckRoleMiddleware().checkRole, new controllers_1.InternalGameController().delete);
exports.default = router;
//# sourceMappingURL=internal.routes.js.map