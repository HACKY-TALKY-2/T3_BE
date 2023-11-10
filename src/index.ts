import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

import { connectDB } from "./db/model";
import { testRouter } from "@/routes";

// TODO: specify port by env
const app = express();
const port = 8000;

// parse body
app.use(express.json());

// Allow CORS from all origins
app.use(cors());

app.get("/hc", (req: Request, res: Response) => {
  res.status(200).send("The server is working alright!");
});

// router 등록
app.use("/test", testRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).send("Not Found");
});

// 글로벌 에러 핸들러
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  if (req.xhr) {
    res.status(500).send("Internal Server Error");
  }
  next(err);
});

// DB 연결
connectDB();

// 서버 시작
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
