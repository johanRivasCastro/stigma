import axios from "axios";
import config from "../../config/config";

const get = async apiEndpoint => {
  try {
    const { data = [] } = await axios.get(config.baseUrl + apiEndpoint);
    return data;
  } catch (err) {
    console.log(err);
  }
};

const put = async (apiEndpoint, user) => {
  try {
    const { data = [] } = await axios.put(config.baseUrl + apiEndpoint, user);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const UserService = {
  get,
  put
};
