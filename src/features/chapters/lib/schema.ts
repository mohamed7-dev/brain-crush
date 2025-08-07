import { chaptersTable } from "@/server/db/schema";
import { createInsertSchema } from "drizzle-zod";
import z from "zod";

const insertChapterSchema = createInsertSchema(chaptersTable);

export const createChapterSchema = insertChapterSchema
  .omit({
    createdAt: true,
    id: true,
    updatedAt: true,
    isPublished: true,
    position: true,
  })
  .extend({
    title: z.string().min(1, { error: "Chapter title can't be left empty!" }),
  });

export type CreateChapterSchema = z.infer<typeof createChapterSchema>;

export const reorderChapterSchema = z.object({
  courseId: insertChapterSchema.shape.courseId,
  reorderData: z.array(
    insertChapterSchema
      .pick({
        id: true,
        position: true,
      })
      .extend({ id: insertChapterSchema.shape.id.nonoptional() })
  ),
});

export type ReorderChapterSchema = z.infer<typeof reorderChapterSchema>;
