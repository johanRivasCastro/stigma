import { FETCHED_ALL_ROLES, CREATED_ROLE, DELETED_ROLE } from "./role.types";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../alert.types";

import { call } from "../../helpers";

const endPoint = "roles/";

const getRoles = () => async (dispatch) => {
  try {
    const { data } = await call("get", endPoint);
    dispatch({
      type: FETCHED_ALL_ROLES,
      roles: data,
    });
  } catch (error) {}
};

const createRole = (role) => async (dispatch) => {
  try {
    const { data } = await call("post", endPoint, role);
    dispatch({
      type: CREATED_ROLE,
      role: data,
    });
    dispatch({
      type: SUCCESS_MESSAGE,
      message: "Role successfully created",
    });
  } catch (err) {
    dispatch(showErrorMessage(err.message));
  }
};

const deleteRole = (roleID) => async (dispatch) => {
  try {
    await call("delete", endPoint + roleID);
    dispatch({
      type: DELETED_ROLE,
      deleted: roleID,
    });
  } catch (error) {
    dispatch(showErrorMessage(error.message));
  }
};

const showErrorMessage = (message) => {
  return {
    type: ERROR_MESSAGE,
    message: message,
  };
};

export const roleActions = {
  getRoles,
  createRole,
  deleteRole,
};
