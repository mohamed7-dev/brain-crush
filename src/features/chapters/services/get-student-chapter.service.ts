import { userOnly } from "@/features/me/lib/authorization";
import { GetStudentChapterSchema } from "../lib/schema";
import { db } from "@/server/db";
import { HttpException } from "@/lib/exceptions";

export async function getStudentChapterService(input: GetStudentChapterSchema) {
  const { chapterId, courseId } = input;
  const { userId } = await userOnly();
  const foundChapter = await db.query.chaptersTable.findFirst({
    where: (t, { eq, and }) =>
      and(eq(t.id, chapterId), eq(t.isPublished, true)),
    with: {
      course: {
        columns: {
          price: true,
          id: true,
        },
        with: {
          purchases: {
            where: (t, { and, eq }) =>
              and(eq(t.userId, userId), eq(t.courseId, courseId)),
          },
        },
      },
      progresses: {
        where: (t, { and, eq }) =>
          and(eq(t.chapterId, chapterId), eq(t.userId, userId)),
      },
    },
  });

  if (!foundChapter) throw HttpException.NotFound("Chapter not found!");

  const isPurchased = foundChapter.course.purchases.length > 0;

  let attachments = null;
  if (isPurchased) {
    attachments = await db.query.attachmentsTable.findMany({
      where: (t, { eq }) => eq(t.courseId, courseId),
      with: {
        asset: true,
      },
    });
  }

  let video = null;
  let nextChapter = null;
  if (isPurchased || foundChapter.isFree) {
    video = await db.query.chaptersTable.findFirst({
      where: (t, { eq, and }) =>
        and(eq(t.id, chapterId), eq(t.isPublished, true)),
      with: {
        video: true,
      },
      columns: {
        videoId: true,
        id: true,
      },
    });
    nextChapter = await db.query.chaptersTable.findFirst({
      where: (t, { eq, and, gt }) =>
        and(
          eq(t.courseId, courseId),
          eq(t.isPublished, true),
          gt(t.position, foundChapter.position)
        ),
      orderBy: (t, { asc }) => asc(t.position),
    });
  }

  return {
    ...foundChapter,
    progresses:
      foundChapter.progresses.length === 1 ? foundChapter.progresses[0] : null,
    video,
    course: {
      ...foundChapter.course,
      attachments,
      purchases:
        foundChapter.course.purchases.length === 1
          ? foundChapter.course.purchases[0]
          : null,
    },
    nextChapter,
  };
}
