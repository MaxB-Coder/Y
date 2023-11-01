import express from "express";

import { getPeeps } from "../controllers/peeps.controller.js";
import { postPeep } from "../controllers/peeps.controller.js";
import { authenticateToken } from "../../authServer.js";

const router = express.Router();

router.use(express.json());

router.route("/").get(getPeeps);
router.route("/").post(postPeep);

export { router as peeps };
