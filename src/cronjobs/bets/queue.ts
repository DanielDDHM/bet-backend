import Queue from 'bull';
import 'dotenv/config';
import { prisma } from '../../config';
import { DefaultStatus } from '../../types';

const CONCURRENCY = 3

export const betsQueue = new Queue('BETS', {
  redis: {
    port: Number(process.env.REDIS_PORT),
    host: process.env.REDIS_HOST,
  },
  defaultJobOptions: {
    removeOnComplete: true,
    removeOnFail: true,
  }
})

betsQueue.process(CONCURRENCY, async (job: any) => {
  const { id } = job.data

  try {
    await prisma.bets.update({
      where: {
        id
      },
      data: {
        status: DefaultStatus.CREATED
      }
    })
  } catch (error: any) {
    console.log(error)
  }
})

betsQueue.on('completed', job => {
  console.log(`[ Job with id ${job.id} has been completed! Order ${job.data.id} ]`);
})

betsQueue.on('failed', job => {
  console.log(`[ Job with id ${job.id} has failed! Order ${job.data.id} ]`);
})
