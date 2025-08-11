import { fetchCourses } from "@/features/courses/api/fetch-courses.api";
import { GetCoursesSchema } from "@/features/courses/lib/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("query");
  const limit = searchParams.get("limit");
  const cursor = searchParams.get("cursor");

  const parsedCursor = cursor
    ? (JSON.parse(cursor) as GetCoursesSchema["cursor"])
    : undefined;

  const data = await fetchCourses({
    query: query || undefined,
    cursor: parsedCursor
      ? { ...parsedCursor, updatedAt: new Date(parsedCursor.updatedAt) }
      : undefined,
    limit: limit ? Number(limit) : undefined,
  });
  return NextResponse.json(data, { status: data.statusCode });
}
