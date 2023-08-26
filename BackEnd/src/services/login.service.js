import User from "../models/user.model.js";

export const postLoginService = async ({ email, password }) => {
  try {
    return await User.find({ email, password });
  } catch (e) {
    throw e;
  }
};
