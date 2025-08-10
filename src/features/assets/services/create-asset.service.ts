import { db } from "@/server/db";
import { CreateAssetSchema } from "../lib/schema";
import { assetsTable } from "@/server/db/schema";

export async function createAssetService(input: CreateAssetSchema) {
  return await db.insert(assetsTable).values(input).returning();
}
