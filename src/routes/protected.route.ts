import express from "express";
import { AuthController } from "../modules/auth/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { NewsCategoryController } from "../modules/news-category/news-category.controller";
import { NewsController } from "../modules/news/news.controller";

export const protectedRouter = express.Router();

protectedRouter.post("/auth/login", AuthController.login);

// use middleware
protectedRouter.use(authMiddleware);

// PROTECTED ADMIN ROUTES
// auth routes
protectedRouter.post("/auth/logout", AuthController.logout);

// news category routes
protectedRouter.post("/news-categories", NewsCategoryController.create);
protectedRouter.get("/news-categories", NewsCategoryController.getAll);
protectedRouter.put(
  "/news-categories/:id(\\d+)",
  NewsCategoryController.update,
);
protectedRouter.delete(
  "/news-categories/:id(\\d+)",
  NewsCategoryController.delete,
);

// news routes
protectedRouter.post("/news", NewsController.create);
protectedRouter.put("/news/:id(\\d+)", NewsController.update);
protectedRouter.delete("/news/:id(\\d+)", NewsController.delete);
