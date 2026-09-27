import express from "express";
import { body } from "express-validator";

import { postLogin } from "../controllers/login.controller.js";

const router = express.Router();

router.use(express.json());

router
  .route("/")
  .post(
    body("email").isString().notEmpty(),
    body("password").isString().notEmpty(),
    postLogin
  );

export { router as login };
