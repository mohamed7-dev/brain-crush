import z from "zod";

export const getCategoriesSchema = z.object({
  limit: z.number().min(1).max(100).optional(),
  page: z.number().optional(),
  query: z.string().trim().optional(),
});

export type GetCategoriesSchema = z.infer<typeof getCategoriesSchema>;
