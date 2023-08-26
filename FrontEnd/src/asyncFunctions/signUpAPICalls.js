import axios from "axios";

export const checkSignUp = async ({ name, username, email, password }) => {
  try {
    const signUpReturn = await axios.post(
      import.meta.env.VITE_PEEPSURL + "/sign-up",
      {
        name: name,
        username: username,
        email: email,
        password: password,
      }
    );
    const signUpStatus = signUpReturn.status === 201;
    return signUpStatus;
  } catch (e) {
    return {
      status: e.response?.status ?? e.status,
      error: {
        type: `post`,
        message: e.response?.message ?? e.message,
      },
    };
  }
};
