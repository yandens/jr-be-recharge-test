import { z, ZodType } from "zod";
import { NewsCategoryDto } from "./news-category.dto";

export class NewsCategoryValidation {
  static readonly NEWS_CATEGORY: ZodType<NewsCategoryDto> = z.object({
    name: z.string().min(3).max(255),
  });
}
