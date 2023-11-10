import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "@/docs/index.js";

// setup swagger docs
const router = Router();
router.use(swaggerUi.serve);
router.use(swaggerUi.setup(swaggerDocs, { explorer: true }));

export default router;
