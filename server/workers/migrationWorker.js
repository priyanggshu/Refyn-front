import { Worker } from "bullmq";
import IORedis from "ioredis";
import { applySchemaToDB } from "../services/migrationService.js";
import { emitMigrationProgress } from "../services/websocketService.js";
import redisClient from "../utils/redisClient.js";

const connection = new IORedis(process.env.UPSTASH_REDIS_URL);

const worker = new Worker(
  "migration-queue",
  async (job) => {
    const { userId, batch, targetDB, migrationId } = job.data;

    emitMigrationProgress(userId, {
      status: "batch-applying",
      message: `Applying batch ${batch.batchId}...`,
    });

    await applySchemaToDB(targetDB, batch.schemaChunk);

    emitMigrationProgress(userId, {
      status: "batch-applied",
      message: `Batch ${batch.batchId} applied successfully!`,
    });

    const key = `migration:${migrationId}:batches`;
    const currentStatus = JSON.parse(await redisClient.get(key));
    currentStatus[batch.batchId] = "completed";

    await redisClient.set(key, JSON.stringify(currentStatus));

    // check if all batches are done
    const allDone = Object.values(currentStatus).every(
      (val) => val === "completed"
    );
    if (allDone) {
      emitMigrationProgress(userId, {
        status: "completed",
        message: "All schema batches applied. Migration completed!",
      });

      await redisClient.set(
        `migration:${migrationId}`,
        JSON.stringify({ status: "completed" })
      );
    }
  },
  { connection }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job.id} failed:`, err.message);
});
