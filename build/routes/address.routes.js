"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
router.get('/get', new controllers_1.AddressController().get);
router.post('/create', new controllers_1.AddressController().create);
exports.default = router;
//# sourceMappingURL=address.routes.js.map