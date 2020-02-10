import axios from "axios";
import config from "../config/config";

const post = (apiEndPoint, credentials) => {
  return axios
    .post(config.baseUrl + apiEndPoint, credentials)
    .then(response => {
      return response.data;
    })
    .catch(err => console.log(err));
};

export const AuthService = { post };
