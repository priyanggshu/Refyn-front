import express from "express";
import { approveSchemaFix, getMigrationStatus, getSchemasForMigration, migrateDatabase, rollbackMigration } from "../controllers/migrationController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";
import supabase from "../utils/supabaseClient.js";

const router = express.Router();

router.post("/migrate", authenticateUser, migrateDatabase);
router.get("/status/:id", authenticateUser, getMigrationStatus);
router.post("/rollback/:id", authenticateUser, rollbackMigration);
router.get('/:id/schema', authenticateUser, getSchemasForMigration);
router.post('/:id/approve-schema', authenticateUser, approveSchemaFix);



router.get("/schema/:id", authenticateUser, async (req, res) => {
  const { id } = req.params;

  try {
    const { data: file, error } = await supabase.storage
      .from("schemas")
      .download(`schemas/${id}.sql`);
  
    if (error) return res.status(404).json({ error: "Schema not found" });

    const chunks = [];
    const reader = file.getReader();
    const decoder = new TextDecoder("utf-8");

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(decoder.decode(value));
    }

    const fileContent = chunks.join("");
    res.status(200).send(fileContent);    
  } catch (error) {
    console.error("Error fetching schema file:", err);
    res.status(500).json({ error: "Failed to retrieve schema file." });
  }
});

router.post("/schema/:id", authenticateUser, async (req, res) => {
    const { id } = req.params;
    const { schema } = req.body;
  
    const { error } = await supabase
      .storage
      .from("schemas")
      .upload(`schemas/${id}.sql`, new Blob([schema]), {
        contentType: "text/plain",
        upsert: true,
      });
  
    if (error) return res.status(500).json({ error: "Failed to update schema" });
  
    res.json({ success: true });
  });
  

export default router;
