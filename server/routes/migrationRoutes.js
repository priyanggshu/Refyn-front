import express from "express";
import { getMigrationStatus, migrateDatabase, rollbackMigration } from "../controllers/migrationController.js";

const router = express.Router();

router.post('/migrate', migrateDatabase);
router.get('/status/:id', getMigrationStatus);
router.post('/rollback/:id', rollbackMigration);

export default router;