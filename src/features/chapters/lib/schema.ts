import { createAssetSchema } from "@/features/assets/lib/schema";
import { chaptersTable } from "@/server/db/schema";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import z from "zod";

export const createChapterSchema = createInsertSchema(chaptersTable, {
  title: z.string().min(1, { error: "Chapter title can't be left empty!" }),
  courseId: z.uuid().trim(),
}).omit({ updatedAt: true, createdAt: true, id: true });

export type CreateChapterSchema = z.infer<typeof createChapterSchema>;

export const reorderChapterSchema = z.object({
  courseId: createChapterSchema.shape.courseId,
  reorderData: z.array(
    z.object({
      id: z.uuid({ error: "Invalid chapter id" }).trim(),
      position: z
        .number()
        .min(1, { error: "Chapters' positions start from 1" }),
    })
  ),
});

export type ReorderChapterSchema = z.infer<typeof reorderChapterSchema>;

export const getChapterSchema = z.object({
  id: z.uuid({ error: "Invalid chapter id" }).trim(),
});
export type GetChapterSchema = z.infer<typeof getChapterSchema>;

export const updateChapterSchema = z.object({
  data: createUpdateSchema(chaptersTable).omit({
    courseId: true,
    id: true,
    createdAt: true,
    updatedAt: true,
  }),
  id: z.uuid({ error: "Invalid chapter id" }).trim(),
  courseId: createChapterSchema.shape.courseId,
});
export type UpdateChapterSchema = z.infer<typeof updateChapterSchema>;

export const updateChapterTitleSchema = updateChapterSchema
  .pick({
    id: true,
  })
  .extend({
    title: updateChapterSchema.shape.data.shape.title.nonoptional(),
  });
export type UpdateChapterTitleSchema = z.infer<typeof updateChapterTitleSchema>;

export const updateChapterDescriptionSchema = updateChapterSchema
  .pick({
    id: true,
  })
  .extend({
    description: updateChapterSchema.shape.data.shape.description.nonoptional(),
  });
export type UpdateChapterDescriptionSchema = z.infer<
  typeof updateChapterDescriptionSchema
>;

export const updateChapterAccessSchema = updateChapterSchema
  .pick({
    id: true,
  })
  .extend({
    isFree: updateChapterSchema.shape.data.shape.isFree.nonoptional(),
  });
export type UpdateChapterAccessSchema = z.infer<
  typeof updateChapterAccessSchema
>;

export const updateChapterVideoSchema = z.object({
  id: updateChapterSchema.shape.id,
  courseId: updateChapterSchema.shape.courseId,
  asset: createAssetSchema,
});
export type UpdateChapterVideoSchema = z.infer<typeof updateChapterVideoSchema>;

export const deleteChapterSchema = z.object({
  chapterId: updateChapterSchema.shape.id,
  courseId: updateChapterSchema.shape.courseId,
});

export type DeleteChapterSchema = z.infer<typeof deleteChapterSchema>;

export const getStudentChapterSchema = z.object({
  chapterId: z.uuid({ error: "Invalid chapter id" }).trim(),
  courseId: z.uuid({ error: "Invalid course id" }).trim(),
});
export type GetStudentChapterSchema = z.infer<typeof getStudentChapterSchema>;

export const progressChapterSchema = z.object({
  chapterId: z.uuid({ error: "Invalid chapter id" }).trim(),
  courseId: z.uuid({ error: "Invalid course id" }).trim(),
  isCompleted: z.boolean(),
});
export type ProgressChapterSchema = z.infer<typeof progressChapterSchema>;
