"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
require("dotenv/config");
const connectionIORedis = new ioredis_1.default({
    path: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
});
exports.default = connectionIORedis;
//# sourceMappingURL=redis.js.map