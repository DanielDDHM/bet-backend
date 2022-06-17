"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
router.post('/login', new controllers_1.AuthController().login);
router.post('/logout', new controllers_1.AuthController().logout);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map