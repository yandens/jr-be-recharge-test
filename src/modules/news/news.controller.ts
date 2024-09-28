import { Request, Response, NextFunction } from "express";
import { UserRequest } from "../../types/user.type";
import { NewsDto, NewsSearchDto } from "./news.dto";
import { NewsService } from "./news.service";

export class NewsController {
  static async create(
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const request = req.body as NewsDto;
      await NewsService.create(req.user!, request);
      return res.status(201).json({ data: "OK" });
    } catch (error) {
      next(error);
    }
  }

  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const response = await NewsService.getAll();
      return res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }

  static async getOne(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const id = parseInt(req.params.id);
      const response = await NewsService.getOne(id);
      return res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }

  static async update(
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const id = parseInt(req.params.id);
      const request = req.body as NewsDto;
      await NewsService.update(req.user!, id, request);
      return res.status(200).json({ data: "OK" });
    } catch (error) {
      next(error);
    }
  }

  static async delete(
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const id = parseInt(req.params.id);
      await NewsService.delete(req.user!, id);
      return res.status(200).json({ data: "OK" });
    } catch (error) {
      next(error);
    }
  }

  static async search(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const request: NewsSearchDto = {
        query: req.query.query as string,
        page: req.query.page ? Number(req.query.page) : 1,
        size: req.query.size ? Number(req.query.size) : 10,
      };
      const response = await NewsService.search(request);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
