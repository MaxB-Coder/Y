import express from "express";
import { body } from "express-validator";

import { postSignUp } from "../controllers/sign-up.controller.js";

const router = express.Router();

router
  .route("/")
  .post(
    body(["name", "username", "email"]).isString().notEmpty(),
    // bcrypt ignores everything after 72 bytes
    body("password").isString().isLength({ min: 8, max: 72 }),
    postSignUp
  );

export { router as signUp };
