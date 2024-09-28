import { NextFunction, Response } from "express";
import { UserRequest } from "../types/user.type";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ResponseError } from "../error/response.error";

export const authMiddleware = async (
  req: UserRequest,
  res: Response,
  next: NextFunction,
) => {
  // get token from header authorization
  let token = req.headers.authorization;

  // check if token is present
  if (!token) throw new ResponseError(401, "Unauthorized");

  // split token
  const splitedToken = token.split(" ");
  if (splitedToken.length === 2 && splitedToken[0] === "Bearer") {
    jwt.verify(
      splitedToken[1],
      process.env.JWT_SECRET_KEY!,
      async (err, payload) => {
        try {
          if (err && err.name === "TokenExpiredError") {
            throw new ResponseError(401, "Expired Token");
          } else if (err) {
            throw new ResponseError(401, "Invalid Token");
          } else {
            req.user = payload as JwtPayload;
            next();
          }
        } catch (error) {
          next(error);
        }
      },
    );
  } else {
    throw new ResponseError(401, "Unauthorized");
  }
};
