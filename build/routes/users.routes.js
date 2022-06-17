"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const middleware_1 = require("../middleware");
const router = express_1.default.Router();
router.post('/create', new controllers_1.UsersController().create);
router.get('/get/:id?', new middleware_1.CheckTokenMiddleware().verifyToken, new middleware_1.CheckRoleMiddleware().checkRole, new controllers_1.UsersController().get);
router.put('/update/:id?', new middleware_1.CheckTokenMiddleware().verifyToken, new middleware_1.CheckRoleMiddleware().checkRole, new controllers_1.UsersController().update);
router.patch('/confirmAccount/:id?', new middleware_1.CheckTokenMiddleware().verifyToken, new controllers_1.UsersController().update);
router.post('/recoverPassword/:id?', new middleware_1.CheckTokenMiddleware().verifyToken);
exports.default = router;
//# sourceMappingURL=users.routes.js.map