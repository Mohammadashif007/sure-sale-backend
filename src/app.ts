import express, { Request, Response } from "express";
import { router } from "./app/routes";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { NotFound } from "./app/middlewares/notFound";

const app = express();

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Welcome to home stay server",
    });
});

app.use(globalErrorHandler);
app.use(NotFound)

export default app;
