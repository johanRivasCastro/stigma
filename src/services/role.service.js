import axios from "axios";
import config from "../config/config";

const get = apiEndPoint => {
  return axios
    .get(config.baseUrl + apiEndPoint)
    .then(response => {
      return response.data;
    })
    .catch(err => console.log(err));
};

export const RoleService = { get };
