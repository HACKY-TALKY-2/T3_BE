import express, { Request, Response, NextFunction } from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello World!");
});

// router 등록

// 404
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

// 서버 시작
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
