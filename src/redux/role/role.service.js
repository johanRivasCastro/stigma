import axios from "axios";
import config from "../../config/config";

const get = async apiEndPoint => {
  try {
    const { data = [] } = await axios.get(config.baseUrl + apiEndPoint);
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const post = async (apiEndPoint, role) => {
  try {
    const { data = [] } = await axios.post(config.baseUrl + apiEndPoint, role);
    return data;
  } catch (err) {
    console.log(err);
  }
};

const deleteRole = async (apiEndPoint, roleId) => {
  try {
    const { data = [] } = await axios.delete(
      config.baseUrl + apiEndPoint + roleId
    );

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const roleService = { get, post, deleteRole };
