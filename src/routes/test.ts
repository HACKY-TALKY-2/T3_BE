import { Router } from "express";
import { testHandler } from "@/controllers/test.js";

const router = Router();

router.get("/", testHandler);

export default router;
