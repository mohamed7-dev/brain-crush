import { assetsTable } from "@/server/db/schema";
import { createInsertSchema } from "drizzle-zod";
import z from "zod";

export const createAssetSchema = createInsertSchema(assetsTable, {
  id: z.uuidv4({ error: "Invalid asset id" }).trim(),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateAssetSchema = z.infer<typeof createAssetSchema>;
