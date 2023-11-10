import { Router } from "express";
import { excuseHandler } from "@/controllers/excuse.js";

const router = Router();

router.get("/", excuseHandler);

export default router;
