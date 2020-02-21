import axios from "axios";
import config from "../../config/config";

const get = async apiEndpoint => {
  try {
    const { data = [] } = await axios.get(config.baseUrl + apiEndpoint);
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const post = async (apiEndpoint, course) => {
  try {
    const res = await axios.post(config.baseUrl + apiEndpoint, course);
    return res;
  } catch (err) {
    console.log(err);
    return err.response;
  }
};

export const courseService = {
  get,
  post
};
