import { db } from "@/server/db";
import { HttpException } from "@/lib/exceptions";
import { eq, inArray } from "drizzle-orm";
import { assetsTable, coursesTable } from "@/server/db/schema";
import cloudinary from "@/config/cloudinary.config";
import { DeleteCourseSchema } from "../lib/schema";
import { teacherOnly } from "@/features/me/lib/authorization";

export async function deleteCourseService(input: DeleteCourseSchema) {
  await teacherOnly();
  const foundCourse = await db.query.coursesTable.findFirst({
    where: (t, { eq }) => eq(t.id, input.courseId),
    with: {
      cover: true,
      attachments: {
        with: {
          asset: true,
        },
      },
      chapters: {
        with: {
          video: true,
        },
      },
    },
  });
  if (!foundCourse) throw HttpException.NotFound("Course not found.");

  await db.transaction(async (tx) => {
    if (foundCourse.attachments.length) {
      // deleting asset cascades deletion of attachments
      await tx.delete(assetsTable).where(
        inArray(
          assetsTable.id,
          foundCourse.attachments.map((a) => a.assetId)
        )
      );
    }
    if (foundCourse.chapters.length) {
      await tx.delete(assetsTable).where(
        inArray(
          assetsTable.id,
          foundCourse.chapters
            .filter((c) => c.videoId !== null)
            .map((c) => c.videoId as string)
        )
      );
    }
    await tx.delete(coursesTable).where(eq(coursesTable.id, foundCourse.id));
    if (foundCourse.coverId) {
      await tx
        .delete(assetsTable)
        .where(eq(assetsTable.id, foundCourse.coverId));
    }
  });
  if (foundCourse.attachments) {
    await cloudinary.api.delete_resources(
      foundCourse.attachments.map((a) => a.asset.publicId),
      {
        resource_type: "raw",
      }
    );
  }
  if (foundCourse.chapters) {
    await cloudinary.api.delete_resources(
      foundCourse.chapters
        .filter((c) => c.video !== null)
        .map((c) => c.video?.publicId as string),
      {
        resource_type: "video",
      }
    );
  }
  if (foundCourse.cover?.publicId) {
    await cloudinary.uploader.destroy(foundCourse.cover?.publicId, {
      resource_type: "image",
    });
  }
  return {
    deleted: true,
    resourceId: foundCourse.id,
  };
}
