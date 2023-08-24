import express from "express";

import { postLogin } from "../controllers/login.controller.js";

const router = express.Router();

router.use(express.json());

router.route("/").post(postLogin);

export { router as login };
