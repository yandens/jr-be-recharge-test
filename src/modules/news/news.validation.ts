import { z, ZodType } from "zod";
import { NewsDto, NewsSearchDto } from "./news.dto";

export class NewsValidation {
  static readonly NEWS: ZodType<NewsDto> = z.object({
    title: z.string().min(3).max(255),
    snippet: z.string().min(3).max(255),
    content: z.string().min(3),
    category_id: z.number().int(),
  });

  static readonly SEARCH: ZodType<NewsSearchDto> = z.object({
    query: z.string().min(3).max(255),
    page: z.number().int(),
    size: z.number().int(),
  });
}
