import express from "express";
import { protectedRouter } from "../routes/protected.route";
import { publicRouter } from "../routes/public.route";
import { errorMiddleware } from "../middlewares/error.middleware";

export const app = express();
app.use(express.json());
app.use("/api", publicRouter);
app.use("/api", protectedRouter);
app.use(errorMiddleware);
