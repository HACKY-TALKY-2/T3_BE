import { Router } from "express";
import { body } from "express-validator";
import { validateReq } from "@/middlewares/validate.js";
import { excuseHandler, excuseVoiceHandler } from "@/controllers/excuse.js";

const router = Router();

router.post(
  "/",
  body("receiver").isString().isLength({ max: 100 }),
  body("type").isString().isLength({ max: 100 }),
  body("tone").isString().isLength({ max: 100 }),
  body("situation").optional().isString().isLength({ max: 100 }),
  validateReq,
  excuseHandler,
);

router.post(
  "/voice",
  body("language").optional().isString().isIn(["한국어", "영어", "일본어"]),
  body("gender").isString().isIn(["남성", "여성"]),
  body("age").isString().isIn(["청소년", "청년", "중년", "장년"]),
  body("text").isString().isLength({ min: 1, max: 200 }),
  validateReq,
  excuseVoiceHandler,
);

export default router;
