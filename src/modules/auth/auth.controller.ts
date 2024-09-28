import { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service";
import { LoginRequestDto } from "./auth.dto";
import { UserRequest } from "../../types/user.type";

export class AuthController {
  static async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const request = req.body as LoginRequestDto;
      const response = await AuthService.login(request);
      return res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }

  static async logout(
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      await AuthService.logout(req.user!);
      return res.status(200).json({ data: "OK" });
    } catch (error) {
      next(error);
    }
  }
}
