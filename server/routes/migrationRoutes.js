import express from "express";
import { 
  migrateDatabase,
  getMigrationStatus,
  rollbackMigration,
  getSchemasForMigration,
  approveSchemaFix,
} from "../controllers/migrationController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/migrate", authenticateToken, migrateDatabase);
router.get("/status/:id", authenticateToken, getMigrationStatus);
router.post("/rollback/:id", authenticateToken, rollbackMigration);
router.get('/:id/schema', authenticateToken, getSchemasForMigration);
router.post('/:id/approve-schema', authenticateToken, approveSchemaFix);
export default router;
