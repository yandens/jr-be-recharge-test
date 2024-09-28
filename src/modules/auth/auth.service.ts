import { LoginRequestDto } from "./auth.dto";
import { Validation } from "../../validation/validation";
import { AuthValidation } from "./auth.validation";
import { prisma } from "../../applications/database";
import { ResponseError } from "../../error/response.error";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";

export class AuthService {
  static async login(request: LoginRequestDto): Promise<string> {
    // validate request
    const loginRequest: LoginRequestDto = Validation.validate(
      AuthValidation.LOGIN_REQUEST,
      request,
    );

    // get user by email
    const user = await prisma.user.findUnique({
      where: {
        email: loginRequest.email,
      },
    });

    // check if user exists
    if (!user) throw new ResponseError(401, "Invalid credentials");

    // compare password
    const isValidPassword = await bcrypt.compare(
      loginRequest.password,
      user.password,
    );

    // check if password is valid]
    if (!isValidPassword) throw new ResponseError(401, "Invalid credentials");

    // generate token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET_KEY!,
      {
        expiresIn: "1h",
      },
    );

    // update user with generated token
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        token,
      },
    });

    return token;
  }

  static async logout(user: JwtPayload): Promise<void> {
    // update user with generated token
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        token: null,
      },
    });
  }
}
