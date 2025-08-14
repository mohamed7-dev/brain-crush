import { teacherOnly } from "@/features/me/lib/authorization";
import { db } from "@/server/db";
import { coursesTable, purchasesTable } from "@/server/db/schema";
import { eq, sql } from "drizzle-orm";

export async function getCoursesAnalyticsService() {
  const { userId: teacherId } = await teacherOnly();
  const purchasesStats = await db
    .select({
      courseTitle: coursesTable.title,
      coursePrice: coursesTable.price,
      purchaseCount: sql<number>`COUNT(${purchasesTable.id})`.as(
        "purchase_count"
      ),
    })
    .from(coursesTable)
    .leftJoin(purchasesTable, eq(coursesTable.id, purchasesTable.courseId))
    .where(eq(coursesTable.creatorId, teacherId))
    .groupBy(coursesTable.id);

  const totalSales = purchasesStats.reduce(
    (acc, curr) => acc + +curr.purchaseCount,
    0
  );
  const totalRevenue = purchasesStats.reduce(
    (acc, curr) => acc + curr.purchaseCount * curr.coursePrice!,
    0
  );

  return {
    data: purchasesStats,
    totalSales,
    totalRevenue,
  };
}
