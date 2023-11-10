import { Router } from "express";
import { excuseHandler } from "@/controllers/excuse";

const router = Router();

router.get("/", excuseHandler);

export default router;
