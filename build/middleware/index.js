"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckRoleMiddleware = exports.CheckTokenMiddleware = void 0;
var checkToken_middleware_1 = require("./checkToken.middleware");
Object.defineProperty(exports, "CheckTokenMiddleware", { enumerable: true, get: function () { return __importDefault(checkToken_middleware_1).default; } });
var checkRole_middleware_1 = require("./checkRole.middleware");
Object.defineProperty(exports, "CheckRoleMiddleware", { enumerable: true, get: function () { return __importDefault(checkRole_middleware_1).default; } });
//# sourceMappingURL=index.js.map