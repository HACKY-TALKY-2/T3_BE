import { Router } from "express";
import { body } from "express-validator";
import { validateReq } from "@/middlewares/validate.js";
import { excuseHandler } from "@/controllers/excuse.js";

const router = Router();

router.post("/", body("text").isString(), validateReq, excuseHandler);

export default router;
