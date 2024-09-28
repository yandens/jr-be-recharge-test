import { NewsCategoryDto } from "./news-category.dto";
import { Validation } from "../../validation/validation";
import { NewsCategoryValidation } from "./news-category.validation";
import { prisma } from "../../applications/database";
import { ResponseError } from "../../error/response.error";

export class NewsCategoryService {
  static async create(request: NewsCategoryDto): Promise<void> {
    // validate request
    const newsCategoryRequest: NewsCategoryDto = Validation.validate(
      NewsCategoryValidation.NEWS_CATEGORY,
      request,
    );

    // check if news category already exists
    const newsCategory = await prisma.newsCategory.findFirst({
      where: newsCategoryRequest,
    });
    if (newsCategory)
      throw new ResponseError(400, "News category already exists");

    // create news category
    await prisma.newsCategory.create({
      data: newsCategoryRequest,
    });
  }

  static async getAll(): Promise<any> {
    return prisma.newsCategory.findMany();
  }

  static async update(id: number, request: NewsCategoryDto): Promise<void> {
    // validate request
    const newsCategoryRequest: NewsCategoryDto = Validation.validate(
      NewsCategoryValidation.NEWS_CATEGORY,
      request,
    );

    // check if news category exists
    const newsCategory = await prisma.newsCategory.findUnique({
      where: {
        id,
      },
    });
    if (!newsCategory) throw new ResponseError(404, "News category not found");

    // update news category
    await prisma.newsCategory.update({
      where: {
        id,
      },
      data: newsCategoryRequest,
    });
  }

  static async delete(id: number): Promise<void> {
    // check if news category exists
    const newsCategory = await prisma.newsCategory.findUnique({
      where: {
        id,
      },
    });
    if (!newsCategory) throw new ResponseError(404, "News category not found");

    // delete news category
    await prisma.newsCategory.delete({
      where: {
        id,
      },
    });
  }
}
