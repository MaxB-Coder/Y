import User from "../models/user.model.js";
import { hashPassword } from "../utils/password.js";

export const postSignUpService = async ({ name, username, email, password }) => {
  try {
    const userCheck = await User.exists({ $or: [{ email }, { username }] });
    if (!userCheck) {
      const passwordHash = await hashPassword(password);
      return await User.create({ name, username, email, password: passwordHash });
    } else {
      throw new Error("User already exists");
    }
  } catch (e) {
    throw e;
  }
};
