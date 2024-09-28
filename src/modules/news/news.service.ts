import { JwtPayload } from "jsonwebtoken";
import { NewsDto, NewsSearchDto } from "./news.dto";
import { ResponseError } from "../../error/response.error";
import { Validation } from "../../validation/validation";
import { NewsValidation } from "./news.validation";
import { prisma } from "../../applications/database";

export class NewsService {
  static async create(user: JwtPayload, request: NewsDto): Promise<void> {
    // validate request
    const newsRequest: NewsDto = Validation.validate(
      NewsValidation.NEWS,
      request,
    );

    // check if news category exists
    const newsCategory = await prisma.newsCategory.findUnique({
      where: {
        id: newsRequest.category_id,
      },
    });
    if (!newsCategory) throw new ResponseError(404, "News category not found");

    // prepare record
    const record = { ...newsRequest, user_id: user.id };

    // create news
    await prisma.news.create({
      data: record,
    });
  }

  static async getAll(): Promise<any> {
    return prisma.news.findMany({
      select: {
        id: true,
        title: true,
        snippet: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });
  }

  static async getOne(id: number): Promise<any> {
    const news = await prisma.news.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        title: true,
        snippet: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });

    if (!news) throw new ResponseError(404, "News not found");

    return news;
  }

  static async update(
    user: JwtPayload,
    id: number,
    request: NewsDto,
  ): Promise<void> {
    // validate request
    const newsRequest: NewsDto = Validation.validate(
      NewsValidation.NEWS,
      request,
    );

    // check if news exists
    const news = await prisma.news.findUnique({
      where: {
        id,
      },
    });
    if (!news) throw new ResponseError(404, "News not found");

    // check if user is the owner of the news
    if (news.user_id !== user.id) throw new ResponseError(403, "Forbidden");

    // check if news category exists
    const newsCategory = await prisma.newsCategory.findUnique({
      where: {
        id: newsRequest.category_id,
      },
    });
    if (!newsCategory) throw new ResponseError(404, "News category not found");

    // update news
    await prisma.news.update({
      where: {
        id,
      },
      data: newsRequest,
    });
  }

  static async delete(user: JwtPayload, id: number): Promise<void> {
    // check if news exists
    const news = await prisma.news.findUnique({
      where: {
        id,
      },
    });
    if (!news) throw new ResponseError(404, "News not found");

    // check if user is the owner of the news
    if (news.user_id !== user.id) throw new ResponseError(403, "Forbidden");

    // delete news
    await prisma.news.delete({
      where: {
        id,
      },
    });
  }

  static async search(request: NewsSearchDto): Promise<any> {
    // validate request
    const newsSearchRequest: NewsSearchDto = Validation.validate(
      NewsValidation.SEARCH,
      request,
    );

    return prisma.news.findMany({
      where: {
        OR: [
          {
            title: {
              contains: newsSearchRequest.query,
              mode: "insensitive",
            },
          },
          {
            snippet: {
              contains: newsSearchRequest.query,
              mode: "insensitive",
            },
          },
          {
            content: {
              contains: newsSearchRequest.query,
              mode: "insensitive",
            },
          },
        ],
      },
      include: {
        category: true,
        user: true,
      },
      take: newsSearchRequest.size,
      skip: newsSearchRequest.size * (newsSearchRequest.page - 1),
    });
  }
}
