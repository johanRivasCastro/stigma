import { FETECHED_ALL_USERS, EDITED_USER, CREATED_USER } from "./user.types";
import { SET_CURRENT_USER } from "../auth/auth.types";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../alert.types";
import { call } from "../../helpers";
import { session } from "../../helpers";

const endPoint = "users/";
const uploadPhotEndpoint = "users/photo";

const getUsers = (page, term = "") => async (dispatch) => {
  try {
    const { data } = await call(
      "get",
      `${endPoint}?pageNo=${page - 1}&pageSize=${9}&filterBy=${term}`
    );
    dispatch({
      type: FETECHED_ALL_USERS,
      users: data,
    });
  } catch (error) {}
};

const editUser = (user) => async (dispatch) => {
  try {
    const { data } = await call("patch", endPoint + user.id, user);
    dispatch({
      type: EDITED_USER,
      user: data,
    });
    if (data.id === session.getUser().id) {
      dispatch({ type: SET_CURRENT_USER, user: data });
      session.editUser(data);
    }
    dispatch(showSuccessMessage("User successfully edited !"));
  } catch (error) {
    dispatch(showErrorMessage(error.message));
  }
};

const createUser = (user) => async (dispatch) => {
  try {
    const { data } = await call("post", endPoint, user);
    dispatch({
      type: CREATED_USER,
      user: data,
    });
    dispatch(showSuccessMessage("User successfully created !"));
  } catch (error) {
    dispatch(showErrorMessage(error.message));
  }
};

const changeUserPhoto = (userId, photo) => async (dispatch) => {
  try {
    const formData = new FormData();
    formData.append("photo", photo);
    const { data } = await call(
      "post",
      `${uploadPhotEndpoint}/${userId}`,
      formData
    );
    dispatch({ type: EDITED_USER, user: data });
    dispatch(showSuccessMessage("User photo changed !"));
    if (data.id === session.getUser().id) {
      dispatch({ type: SET_CURRENT_USER, user: data });
      session.editUser(data);
    }
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

const showSuccessMessage = (message) => {
  return {
    type: SUCCESS_MESSAGE,
    message: message,
  };
};

export const userActions = {
  getUsers,
  editUser,
  createUser,
  changeUserPhoto,
};
