import supabase from "../utils/supabaseClient.js";

export const getSchemaFile = async (req, res) => {
    const { id } = req.params;
    try {
      const { data: file, error } = await supabase.storage.from("schemas").download(`schemas/${id}.sql`);
      if(error) return res.status(404).json({ error: "Schema not found" });
      
      const chunks = [];
      const reader = file.getReader();
      const decoder = new TextDecoder("utf-8");
  
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(decoder.decode(value));
      }
  
      const fileContent = chunks.join(" ");
      res.status(200).send(fileContent);
    } catch (error) {
      console.error("Error fetching schema file:", error);
      res.status(500).json({ error: "Failed to retrieve schema file." });
    }
  };
  
  export const updateSchemaFile = async (req, res) => {
    const { id } = req.params;
    const { schema } = req.body;
    
    try {
      const { error } = await supabase.storage
      .from("schemas")
      .upload(`schemas/${id}.sql`, new Blob([schema]), {
        contentType: "text/plain",
        upsert: true,
      });
      
      if (error) {
        console.error("Failed to update schema file:", error);
        return res.status(500).json({ error: "Failed to update schema" });
      }
  
      res.json({ success: true });
    } catch (error) {
      console.error("Update schema error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };