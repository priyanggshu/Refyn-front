import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const uploadSchemaFile = async (
  schemaText,
  userId,
  migrationId,
  type = "schema"
) => {
  const fileName = `${type}_migration_${migrationId}_${Date.now()}.sql`;
  const path = `users/${userId}/${fileName}`;

  const { error } = await supabase.storage
    .from("schemas")
    .upload(path, new Blob([schemaText]), {
      contentType: "text/plain",
      upsert: true,
    });

  if (error) {
    console.error("Failed to upload schema:", error.message);
    return null;
  }

  const { data } = supabase.storage.from("schemas").getPublicUrl(path);

  return data?.publicUrl || null;
};
