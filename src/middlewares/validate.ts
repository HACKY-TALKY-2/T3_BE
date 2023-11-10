import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const validateReq = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error(errors);
    return res.status(400).json({
      error: "Bad Request",
    });
  }
  return next();
};
