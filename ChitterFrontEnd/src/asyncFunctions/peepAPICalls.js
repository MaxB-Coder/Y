import axios from "axios";

export const getPeeps = async () => {
  try {
    const response = await axios.get(import.meta.env.VITE_PEEPSURL);
    if (Array.isArray(response.data) && response.data?.length > 0)
      return { peeps: response.data, status: response.status };
    throw new Error("There are no peeps");
  } catch (e) {
    return {
      peeps: [],
      status: e.response?.status ?? 204,
      error: {
        type: `get`,
        message: `Data not available from the server: ${
          e.message ?? e.response.message
        }`,
      },
    };
  }
};

export const postPeep = async (peep) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_PEEPSURL}`, peep);
    return { status: response.status };
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
