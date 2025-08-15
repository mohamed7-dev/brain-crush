import { browseCourses } from "@/features/courses/api/browse-courses.api";
import { BrowseCoursesSchema } from "@/features/courses/lib/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("query");
  const categoryId = searchParams.get("categoryId");
  const limit = searchParams.get("limit");
  const cursor = searchParams.get("cursor");

  const parsedCursor = cursor
    ? (JSON.parse(cursor) as BrowseCoursesSchema["cursor"])
    : undefined;

  const data = await browseCourses({
    query: query || undefined,
    categoryId: categoryId || undefined,
    cursor: parsedCursor
      ? { ...parsedCursor, createdAt: new Date(parsedCursor.createdAt) }
      : undefined,
    limit: limit ? Number(limit) : undefined,
  });
  return NextResponse.json(data, { status: data.statusCode });
}
