import express from "express";

import { postSignUp } from "../controllers/sign-up.controller.js";

const router = express.Router();

router.route("/").post(postSignUp);

export { router as signUp };
