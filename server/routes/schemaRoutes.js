import express from "express";
import authenticateToken from "../middlewares/authMiddleware.js";
import { getSchemaFile, updateSchemaFile } from "../controllers/schemaController.js";


const router = express.Router();

// schema file routes (editor)
router.get("/:id", authenticateToken, getSchemaFile);
router.post("/:id", authenticateToken, updateSchemaFile);

export default router;