import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    username: String,
    email: String,
    password: { type: String, select: false },
  },
  {
    toJSON: {
      transform: (_doc, user) => {
        delete user.password;
        return user;
      },
    },
  }
);

const User = mongoose.model("User", userSchema);

export default User;
