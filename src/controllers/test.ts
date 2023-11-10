import { Request, Response } from "express";

export const testHandler = (req: Request, res: Response) => {
  return res.status(200).send("test route");
};
