import express from "express";
import { NewsController } from "../modules/news/news.controller";

export const publicRouter = express.Router();

// default route
publicRouter.get("/", (req, res) => {
  res.send("Hello World");
});

// news routes
publicRouter.get("/news", NewsController.getAll);
publicRouter.get("/news/:id(\\d+)", NewsController.getOne);
publicRouter.get("/news/search", NewsController.search);
