import { Request, Response } from "express";

export const excuseHandler = (req: Request, res: Response) => {
  return res.status(200).send("test route");
};
