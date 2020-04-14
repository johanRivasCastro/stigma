import axios from "axios";
import { baseUrl } from "../config/config";

const request = axios.create({
  baseURL: baseUrl,
});

export const call = async (method = "get", url, payload = null) => {
  try {
    const { data } = await request({
      method: method,
      url: url,
      data: payload,
    });

    return data;
  } catch (err) {
    console.log(err.response);
    const errorMessage = err.response.data.errorMessage;
    throw new Error(errorMessage ? errorMessage : err.response.data.mensaje);
  }
};

export function setAuthorizationToken(token) {
  if (token) {
    request.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete request.defaults.headers.common["Authorization"];
  }
}

request.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status == 500) {
      console.log(error.response);
      window.alert("Something went wrogn with the server");
    }
    if (403 === error.response.status) {
      window.alert("The session has ended");
      window.location = "/login";
    } else {
      return Promise.reject(error);
    }
  }
);
