import { fetchCategories } from "@/features/categories/api/fetch-categories.api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("query");
  const limit = searchParams.get("limit");
  const page = searchParams.get("page");
  const data = await fetchCategories({
    query: query || undefined,
    page: page ? Number(page) : undefined,
    limit: limit ? Number(limit) : undefined,
  });
  return NextResponse.json(data, { status: data.statusCode });
}
