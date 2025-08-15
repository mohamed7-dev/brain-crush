import { db } from "@/server/db";
import { GetCategoriesSchema } from "../lib/schema";
import { categoriesTable } from "@/server/db/schema";
import { like } from "drizzle-orm";
import { getNextPage } from "@/lib/utils";

export async function getCategoriesService(input: GetCategoriesSchema) {
  const defaultLimit = input.limit ? input.limit : 26;
  const defaultPage = input.page ? input.page : 0;
  const defaultOffset = defaultLimit * defaultPage;

  const [categories, total] = await Promise.all([
    db
      .select()
      .from(categoriesTable)
      .where(input.query ? like(categoriesTable.name, input.query) : undefined)
      .offset(defaultOffset)
      .limit(defaultLimit),
    db.$count(
      categoriesTable,
      input.query ? like(categoriesTable.name, input.query) : undefined
    ),
  ]);

  const nextCursor = getNextPage(
    total,
    defaultOffset,
    defaultPage,
    defaultLimit
  );
  return { data: categories, total, nextCursor };
}
