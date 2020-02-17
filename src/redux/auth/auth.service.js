import axios from "axios";
import config from "../../config/config";

const post = async (apiEndPoint, credentials) => {
  try {
    const { data = [] } = await axios.post(
      config.baseUrl + apiEndPoint,
      credentials
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const AuthService = { post };
