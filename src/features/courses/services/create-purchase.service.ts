import { db } from "@/server/db";
import { purchasesTable } from "@/server/db/schema";

export async function createPurchaseService(input: {
  userId: string;
  courseId: string;
}) {
  const newPurchase = await db
    .insert(purchasesTable)
    .values({
      courseId: input.courseId,
      userId: input.userId,
    })
    .returning()
    .then((data) => data[0]);
  return newPurchase;
}
