import { postSignUpService } from "../services/sign-up.service.js";

export const postSignUp = async (req, res) => {
  try {
    const signUp = await postSignUpService(req.body);
    res.status(201).json(signUp);
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
  }
};
