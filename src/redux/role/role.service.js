import axios from "axios";
import config from "../../config/config";

const get = apiEndPoint => {
  try {
    const { data = [] } = await axios.get(config.baseUrl + apiEndPoint);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const RoleService = { get };
