import axios from "axios";
import config from "../../config/config";

const post = async (apiEndPoint, credentials) => {
  try {
    const res = await axios.post(config.baseUrl + apiEndPoint, credentials);
    return res;
  } catch (err) {
    console.log(err);
    return err.response;
  }
};

export const AuthService = { post };
