import axios from "axios";
import config from "../../config/config";

const get = apiEndpoint => {
  return axios
    .get(config.baseUrl + apiEndpoint)
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.error(err);
    });
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
