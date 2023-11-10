import { Router } from "express";
import { testHandler } from "@/controllers/test";

const router = Router();

router.get("/", testHandler);

export default router;
