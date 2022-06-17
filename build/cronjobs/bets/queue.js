"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.betsQueue = void 0;
const bull_1 = __importDefault(require("bull"));
require("dotenv/config");
const config_1 = require("../../config");
const types_1 = require("../../types");
const CONCURRENCY = 3;
exports.betsQueue = new bull_1.default('BETS', {
    redis: {
        port: Number(process.env.REDIS_PORT),
        host: process.env.REDIS_HOST,
    },
    defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: true,
    }
});
exports.betsQueue.process(CONCURRENCY, async (job) => {
    const { id } = job.data;
    try {
        await config_1.prisma.bets.update({
            where: {
                id
            },
            data: {
                status: types_1.DefaultStatus.CREATED
            }
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.betsQueue.on('completed', job => {
    console.log(`[ Job with id ${job.id} has been completed! Order ${job.data.id} ]`);
});
exports.betsQueue.on('failed', job => {
    console.log(`[ Job with id ${job.id} has failed! Order ${job.data.id} ]`);
});
//# sourceMappingURL=queue.js.map