import { z } from "zod";

const calendarDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must use YYYY-MM-DD")
  .refine((value) => {
    const date = new Date(`${value}T00:00:00.000Z`);
    return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
  }, "Date must be a valid calendar date");

export const articleFrontmatterSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
  date: calendarDateSchema,
  author: z.string().trim().min(1),
  tags: z.array(z.string().trim().min(1)).min(1),
  draft: z.boolean(),
});

export type ArticleFrontmatter = z.infer<typeof articleFrontmatterSchema>;
