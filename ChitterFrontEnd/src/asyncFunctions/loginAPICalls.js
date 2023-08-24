import axios from "axios";

export const checkLogin = async ({ email, password }) => {
  try {
    const loginReturn = await axios.post(
      `${import.meta.env.VITE_PEEPSURL}/login`,
      { email, password }
    );
    // Access token?
    return { login: loginReturn.data, status: loginReturn.status };
  } catch (e) {
    return {
      status: e.response.status,
      error: {
        type: `post`,
        message: e.response.data.message,
      },
    };
  }
};
