import z from "zod";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { attachmentsTable, coursesTable } from "@/server/db/schema";

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
  id: z.uuid({ error: "Invalid id" }).trim(),
});

export type GetCourseSchema = z.infer<typeof getCourseSchema>;

export const updateCourseSchema = z.object({
  dataToUpdate: createUpdateSchema(coursesTable).omit({
    id: true,
    createdAt: true,
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
  coverImage: updateCourseSchema.shape.dataToUpdate
    .pick({
      imageUrl: true,
      imageKey: true,
      imageName: true,
      imageSize: true,
      imageType: true,
    })
    .refine(
      (data) =>
        data.imageUrl !== null &&
        data.imageKey !== null &&
        data.imageName !== null &&
        data.imageSize !== null &&
        data.imageType !== null,
      {
        message: "All image fields must be non-null",
      }
    ),
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

export const createAttachmentSchema = createInsertSchema(attachmentsTable).omit(
  {
    id: true,
    createdAt: true,
    updatedAt: true,
  }
);

export type CreateAttachmentSchema = z.infer<typeof createAttachmentSchema>;

export const deleteAttachmentSchema = z.object({
  id: z.uuid().trim(),
  courseId: z.uuid().trim(),
  fileKey: createAttachmentSchema.shape.key,
});

export type DeleteAttachmentSchema = z.infer<typeof deleteAttachmentSchema>;
