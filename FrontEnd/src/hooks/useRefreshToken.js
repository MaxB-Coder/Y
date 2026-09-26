import axios from "axios";
import useAuth from "./useAuth.js";

export const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });

    setAuth((prev) => ({ ...prev, accessToken: response.data.accessToken }));
    return response.data.accessToken;
  };
  return refresh;
};
