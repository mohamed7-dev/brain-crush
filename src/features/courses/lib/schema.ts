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

export const updateCourseSchema = createUpdateSchema(coursesTable);

export type UpdateCourseSchema = z.infer<typeof updateCourseSchema>;

export const updateCourseTitleSchema = updateCourseSchema
  .pick({ title: true })
  .nonoptional();
export type UpdateCourseTitleSchema = z.infer<typeof updateCourseTitleSchema>;
