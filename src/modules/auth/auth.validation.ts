import { z, ZodType } from "zod";
import { LoginRequestDto } from "./auth.dto";

export class AuthValidation {
  static readonly LOGIN_REQUEST: ZodType<LoginRequestDto> = z.object({
    email: z.string().email(),
    password: z.string(),
  });
}
