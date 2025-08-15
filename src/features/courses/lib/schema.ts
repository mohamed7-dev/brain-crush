import z from "zod";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { attachmentsTable, coursesTable } from "@/server/db/schema";
import { createAssetSchema } from "@/features/assets/lib/schema";

const insertCourseSchema = createInsertSchema(coursesTable);

export const createCourseSchema = insertCourseSchema
  .pick({
    title: true,
  })
  .extend({
    title: z.string().min(3, {
      error: "Course title must be at least 3 characters long.",
    }),
  });

export type CreateCourseSchema = z.infer<typeof createCourseSchema>;

export const getCourseSchema = z.object({
  id: z.uuid({ error: "Invalid id" }),
});

export type GetCourseSchema = z.infer<typeof getCourseSchema>;

export const updateCourseSchema = z.object({
  dataToUpdate: createUpdateSchema(coursesTable).omit({
    id: true,
    createdAt: true,
    coverId: true,
  }),
  courseId: z.uuid().trim(),
});

export type UpdateCourseSchema = z.infer<typeof updateCourseSchema>;

export const updateCourseTitleSchema = z.object({
  title: updateCourseSchema.shape.dataToUpdate
    .pick({ title: true })
    .shape.title.nonoptional(),
  courseId: updateCourseSchema.shape.courseId,
});
export type UpdateCourseTitleSchema = z.infer<typeof updateCourseTitleSchema>;

export const updateCourseDescriptionSchema = z.object({
  description: updateCourseSchema.shape.dataToUpdate
    .pick({ description: true })
    .shape.description.nonoptional(),
  courseId: updateCourseSchema.shape.courseId,
});

export type UpdateCourseDescriptionSchema = z.infer<
  typeof updateCourseDescriptionSchema
>;

export const updateCourseCoverSchema = z.object({
  coverImage: createAssetSchema,
  courseId: updateCourseSchema.shape.courseId,
});

export type UpdateCourseCoverSchema = z.infer<typeof updateCourseCoverSchema>;

export const updateCoursePriceSchema = z.object({
  price: updateCourseSchema.shape.dataToUpdate
    .pick({ price: true })
    .shape.price.nonoptional(),
  courseId: updateCourseSchema.shape.courseId,
});

export type UpdateCoursePriceSchema = z.infer<typeof updateCoursePriceSchema>;

const insertAttachmentSchema = createInsertSchema(attachmentsTable, {
  courseId: z.uuidv4({ error: "Invalid course id" }).trim(),
  assetId: z.uuidv4({ error: "Invalid asset id" }).trim(),
  id: z.uuidv4({ error: "Invalid asset id" }).trim(),
});

export const createAttachmentSchema = insertAttachmentSchema
  .omit({
    createdAt: true,
    updatedAt: true,
    assetId: true,
    id: true,
  })
  .extend({
    asset: createAssetSchema,
  });

export type CreateAttachmentSchema = z.infer<typeof createAttachmentSchema>;

export const deleteAttachmentSchema = insertAttachmentSchema.pick({
  courseId: true,
  id: true,
});

export type DeleteAttachmentSchema = z.infer<typeof deleteAttachmentSchema>;

export const deleteCourseSchema = updateCourseSchema.pick({
  courseId: true,
});

export type DeleteCourseSchema = z.infer<typeof deleteCourseSchema>;

export const getCoursesSchema = z.object({
  cursor: z
    .object({
      updatedAt: z.date(),
      id: z.uuidv4({ error: "Invalid course id" }).trim(),
    })
    .optional(),
  limit: z.number().min(1).max(100).optional(),
  query: z.string().min(1).optional(),
});

export type GetCoursesSchema = z.infer<typeof getCoursesSchema>;

export const browseCoursesSchema = getCoursesSchema
  .pick({
    limit: true,
    query: true,
  })
  .extend({
    cursor: z
      .object({
        createdAt: z.date(),
        id: z.uuidv4({ error: "Invalid course id" }).trim(),
      })
      .optional(),
    categoryId: z.uuid().trim().optional(),
  });

export type BrowseCoursesSchema = z.infer<typeof browseCoursesSchema>;

export const enrollUserSchema = updateCourseSchema.pick({
  courseId: true,
});

export type EnrollUserSchema = z.infer<typeof enrollUserSchema>;
