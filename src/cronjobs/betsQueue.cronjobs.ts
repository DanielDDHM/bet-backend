import { CronJob } from "cron";
import { prisma } from "../config";
import { betsQueue } from "../config/queue";

const cron = '*/5 * * * * *';
const tz = 'America/Sao_Paulo';

export default class QueueCron {
  async BetsCron() {
    new CronJob(cron,
      async function name() {
        console.log('[ Searching for Bets... ]')
        const queuedBets = await prisma.bets.findMany({
          where: {
            OR: [
              { status: 'PENDING' },
              { status: 'QUEUED' },
            ]
          },
          orderBy: {
            createdAt: 'asc'
          }
        })

        if (queuedBets.length === null) {
          console.log('[ No pending/queued bets found! ]')
        }

        for (let i = 0; i < queuedBets.length; i++) {
          if (queuedBets[i].status === 'PENDING') {
            await prisma.bets.update({
              where: {
                id: queuedBets[i].id,
              },
              data: {
                status: 'QUEUED',
                updatedAt: new Date(),
              }
            })
          }

          await betsQueue.add(queuedBets[i]);

          console.log(`[ Order ${queuedBets[i].id} added to the queue! ]`)
        }
      },
      null,
      true,
      tz
    );
  }
}
