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

const put = (apiEndpoint, payload) => {
  return axios
    .put(config.baseUrl + apiEndpoint, payload)
    .then(response => {
      return response.data;
    })
    .catch(err => console.error(err));
};

export const UserService = {
  get,
  put
};
