import axios from "axios";
import config from "../../config/config";

const get = async apiEndpoint => {
  try {
    const { data } = await axios.get(config.baseUrl + apiEndpoint);
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const post = async (apiEndpoint, course) => {
  try {
    const { data } = await axios.post(config.baseUrl + apiEndpoint, course);
    return data;
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
};

const getById = async (apiEndpoint, id) => {
  try {
    const { data } = await axios.get(`${config.baseUrl + apiEndpoint}/${id}`);
    return data;
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
};

export const courseService = {
  get,
  post,
  getById
};
