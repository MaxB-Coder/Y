import { postSignUpService } from "../services/sign-up.service.js";
import { validationResult } from "express-validator";

export const postSignUp = async (req, res) => {
  const results = validationResult(req);
  if (results.errors.length !== 0) {
    return res.status(422).json({ error: "Invalid sign-up details" });
  }
  try {
    const signUp = await postSignUpService(req.body);
    res.status(201).json(signUp);
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
  }
};
