"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.betsCron = void 0;
const cron_1 = require("cron");
const config_1 = require("../../config");
const types_1 = require("../../types");
const queue_1 = require("./queue");
const cron = '*/5 * * * *';
const tz = 'America/Sao_Paulo';
exports.betsCron = new cron_1.CronJob(cron, async function name() {
    console.log('[ Searching for Bets... ]');
    const queuedBets = await config_1.prisma.bets.findMany({
        where: {
            status: types_1.DefaultStatus.PENDING
        },
        orderBy: {
            createdAt: 'asc'
        }
    });
    if (queuedBets.length === null) {
        console.log('[ No pending/queued bets found! ]');
    }
    for (let i = 0; i < queuedBets.length; i++) {
        if (queuedBets[i].status === types_1.DefaultStatus.PENDING) {
            await config_1.prisma.bets.update({
                where: {
                    id: queuedBets[i].id,
                },
                data: {
                    status: types_1.DefaultStatus.QUEUED,
                    updatedAt: new Date(),
                }
            });
        }
        await queue_1.betsQueue.add(queuedBets[i]);
        console.log(`[ Order ${queuedBets[i].id} added to the queue! ]`);
    }
}, null, true, tz);
//# sourceMappingURL=bets.queue.cron.js.map