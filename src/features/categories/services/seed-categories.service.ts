import { db } from "@/server/db";
import { categoriesTable } from "@/server/db/schema";
import { CATEGORIES } from "../lib/data";

export async function seedCategoriesService() {
  return await db
    .insert(categoriesTable)
    .values(CATEGORIES)
    .then(() => console.log("Categories have been inserted successfully!"));
}
