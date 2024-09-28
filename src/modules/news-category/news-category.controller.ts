import { Request, Response, NextFunction } from "express";
import { NewsCategoryDto } from "./news-category.dto";
import { NewsCategoryService } from "./news-category.service";

export class NewsCategoryController {
  static async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const request = req.body as NewsCategoryDto;
      await NewsCategoryService.create(request);
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
      const response = await NewsCategoryService.getAll();
      return res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }

  static async update(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const id = parseInt(req.params.id);
      const request = req.body as NewsCategoryDto;
      await NewsCategoryService.update(id, request);
      return res.status(200).json({ data: "OK" });
    } catch (error) {
      next(error);
    }
  }

  static async delete(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const id = parseInt(req.params.id);
      await NewsCategoryService.delete(id);
      return res.status(200).json({ data: "OK" });
    } catch (error) {
      next(error);
    }
  }
}
