import { useContext } from "react";
import { AuthContext } from "../assets/contexts/AuthContext";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Intercept = (instance) => {
  const { user, dispatch } = useContext(AuthContext);
  const refreshToken = async () => {
    try {
      const res = await axios.post("https://ffilm.onrender.com/api/user/refresh", {
        token: user.refreshToken,
      });
      dispatch({ type: "REFRESH_TOKEN", payload: res.data });
      return res.data;
    } catch (err) {}
  };
  instance.interceptors.request.use(
    async (config) => {
      let currentDate = new Date();
      const decodedToken = jwtDecode(user.accessToken);
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        const data = await refreshToken();
        config.headers["Authorization"] = "Bearer " + data.accessToken;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export default Intercept;
