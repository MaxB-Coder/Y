import { configDotenv } from "dotenv";

import { postLoginService } from "../services/login.service.js";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

export const postLogin = async (req, res) => {
  const results = validationResult(req);
  if (results.errors.length !== 0) {
    return res.status(422).send(`login failed`);
  }
  try {
    const user = await postLoginService(req.body);
    const accessToken = jwt.sign(
      JSON.stringify(user),
      process.env.ACCESS_TOKEN_SECRET
    );
    res.status(200).json({ accessToken: accessToken });
  } catch (error) {
    console.log(error);
    res.status(400).send(`login failed`);
  }
};
