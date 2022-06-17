"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const middleware_1 = require("../middleware");
const router = express_1.default.Router();
router.get('/get/:id?', new middleware_1.CheckTokenMiddleware().verifyToken, new middleware_1.CheckRoleMiddleware().checkRole, new controllers_1.GamesController().get);
router.post('/create', new middleware_1.CheckTokenMiddleware().verifyToken, new middleware_1.CheckRoleMiddleware().checkRole, new controllers_1.GamesController().create);
router.put('/update/:id?', new middleware_1.CheckTokenMiddleware().verifyToken, new middleware_1.CheckRoleMiddleware().checkRole, new controllers_1.GamesController().update);
router.post('/sort/:id?', new middleware_1.CheckTokenMiddleware().verifyToken, new middleware_1.CheckRoleMiddleware().checkRole, new controllers_1.GamesController().sort);
exports.default = router;
//# sourceMappingURL=game.routes.js.map