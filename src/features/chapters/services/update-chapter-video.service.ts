import { db } from "@/server/db";
import { UpdateChapterVideoSchema } from "../lib/schema";
import { HttpException } from "@/lib/exceptions";
import { ownerOnly } from "@/features/me/lib/authorization";
import { assetsTable, chaptersTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import cloudinary from "@/config/cloudinary.config";

export async function updateChapterVideoService(
  input: UpdateChapterVideoSchema
) {
  const { id, asset } = input;
  const foundChapter = await db.query.chaptersTable.findFirst({
    where: (t, { eq }) => eq(t.id, input.id),
    with: {
      course: {
        columns: {
          creatorId: true,
        },
      },
      video: {
        columns: {
          publicId: true,
        },
      },
    },
  });
  if (!foundChapter) throw HttpException.NotFound("Chapter not found.");
  await ownerOnly(
    foundChapter.course.creatorId,
    "You are not allowed to update this chapter."
  );
  const updatedChapter = await db.transaction(async (tx) => {
    if (foundChapter.videoId && foundChapter.video?.publicId) {
      await cloudinary.uploader.destroy(foundChapter.video?.publicId, {
        resource_type: "video",
      });
      await tx
        .delete(assetsTable)
        .where(eq(assetsTable.id, foundChapter.videoId));
    }
    const newAsset = await tx
      .insert(assetsTable)
      .values(asset)
      .returning()
      .then((data) => data[0]);
    return await tx
      .update(chaptersTable)
      .set({ videoId: newAsset.id })
      .where(eq(chaptersTable.id, id))
      .returning()
      .then((data) => data[0]);
  });
  return updatedChapter;
}
