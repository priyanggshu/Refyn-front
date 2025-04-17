import { Queue } from "bullmq";
import IORedis from "ioredis";

const connection = new IORedis(process.env.UPSTASH_REDIS_URL);

export const migrationQueue = new Queue("migration-queue", { connection });