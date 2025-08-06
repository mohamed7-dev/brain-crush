import z from "zod";
import { createUpdateSchema } from "drizzle-zod";
import { coursesTable } from "@/server/db/schema";

export const createCourseSchema = z.object({
  title: z.string().min(3, {
    error: "The length of the course title must be at least 3 characters.",
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
  coverImageUrl: updateCourseSchema.shape.dataToUpdate
    .pick({ imageUrl: true })
    .shape.imageUrl.nonoptional(),
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
