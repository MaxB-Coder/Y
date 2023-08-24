import User from "../models/user.model.js";

export const postSignUpService = async (newUserInfo) => {
  try {
    const userCheck = await User.find(newUserInfo);
    if (userCheck.length === 0) {
      const newUser = new User(newUserInfo);
      return await newUser.save();
    } else {
      throw new Error("User already exists");
    }
  } catch (e) {
    throw e;
  }
};
