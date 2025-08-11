import { db } from "@/server/db";
import { DeleteChapterSchema } from "../lib/schema";
import { HttpException } from "@/lib/exceptions";
import { eq } from "drizzle-orm";
import { assetsTable, chaptersTable } from "@/server/db/schema";
import cloudinary from "@/config/cloudinary.config";

export async function deleteChapterService(input: DeleteChapterSchema) {
  const foundChapter = await db.query.chaptersTable.findFirst({
    where: (t, { eq }) => eq(t.id, input.chapterId),
    with: {
      video: true,
    },
  });
  if (!foundChapter) throw HttpException.NotFound("Course not found.");
  await db.transaction(async (tx) => {
    await tx.delete(chaptersTable).where(eq(chaptersTable.id, foundChapter.id));
    if (foundChapter.videoId) {
      await tx
        .delete(assetsTable)
        .where(eq(assetsTable.id, foundChapter.videoId));
    }
  });
  if (foundChapter.video?.publicId) {
    await cloudinary.uploader.destroy(foundChapter.video?.publicId, {
      resource_type: "video",
    });
  }
  return {
    deleted: true,
    resourceId: foundChapter.id,
    courseId: foundChapter.courseId,
  };
}
