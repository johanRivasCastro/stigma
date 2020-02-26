import axios from "axios";
import config from "../../config/config";

const get = async apiEndPoint => {
  try {
    const { data } = await axios.get(config.baseUrl + apiEndPoint);
    return data.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const post = async (apiEndPoint, role) => {
  try {
    const { data } = await axios.post(config.baseUrl + apiEndPoint, role);
    return data;
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
};

const deleteRole = async (apiEndPoint, roleId) => {
  try {
    const { data } = await axios.delete(config.baseUrl + apiEndPoint + roleId);
    return data;
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
};

export const roleService = { get, post, deleteRole };
