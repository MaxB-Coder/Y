import User from "../models/user.model.js";
import { verifyPassword } from "../utils/password.js";

export const postLoginService = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email }).select("+password");
    const passwordMatches = await verifyPassword(password, user?.password);
    return user && passwordMatches ? [user] : [];
  } catch (e) {
    throw e;
  }
};
