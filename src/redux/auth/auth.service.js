import axios from "axios";
import config from "../../config/config";
import { call } from "../../helpers/api";

const post = async (apiEndPoint, credentials) => {
  try {
    const res = await axios.post(config.baseUrl + apiEndPoint, credentials);
    return res;
  } catch (err) {
    console.log(err);
    return err.response;
  }
};

const resetPassword = async (password, endpoint) => {
  return await call("patch", endpoint, password);
};

export const AuthService = { post };
