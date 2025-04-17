export const chunkSchema = (schemaText, batchSize = 10) => {
  const lines = schemaText.split("\n").filter((line) => line.trim() !== "");
  const batches = [];

  for (let i = 0; i < lines.length; i += batchSize) {
    const chunk = lines.slice(i, i + batchSize).join("\n");
    batches.push({
      batchId: i / batchSize + 1,
      schemaChunk: chunk,
    });
  }
  return batches;
};
