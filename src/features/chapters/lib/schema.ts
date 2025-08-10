import { createAssetSchema } from "@/features/assets/lib/schema";
import z from "zod";

export const createChapterSchema = z.object({
  title: z.string().min(1, { error: "Chapter title can't be left empty!" }),
  courseId: z.uuid(),
  description: z
    .string()
    .min(1, { error: "Chapter description can't be left empty!" })
    .optional(),
  isFree: z.boolean().default(false).optional(),
  isPublished: z.boolean().default(false).optional(),
  videoUrl: z.string().optional(),
});

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
  data: createChapterSchema
    .pick({
      description: true,
      videoUrl: true,
      isFree: true,
      isPublished: true,
    })
    .extend({
      title: createChapterSchema.shape.title.optional(),
    }),
  id: z.uuid({ error: "Invalid chapter id" }).trim(),
  courseId: z.uuid({ error: "Invalid course id" }).trim(),
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
