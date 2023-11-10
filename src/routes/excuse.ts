import { Router } from "express";
import { body } from "express-validator";
import { validateReq } from "@/middlewares/validate.js";
import { excuseHandler } from "@/controllers/excuse.js";

const router = Router();

router.post(
  "/",
  body("receiver").isString(),
  body("type").isString(),
  body("tone").isString(),
  body("situation").optional().isString(),
  validateReq,
  excuseHandler,
);

export default router;
