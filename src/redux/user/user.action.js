import { UserService } from "./user.service";
import { FETECHED_ALL_USERS, EDITED_USER, CREATED_USER } from "./user.types";
import { ERROR_MESSAGE } from "../alert.types";

const endPoint = "users/";

const getUsers = (page, term = "") => dispatch => {
  UserService.get(
    `${endPoint}?pageNo=${page - 1}&pageSize=${15}&filterBy=${term}`
  ).then(res => {
    dispatch({
      type: FETECHED_ALL_USERS,
      users: res.data
    });
  });
};

const editUser = user => dispatch => {
  UserService.put(endPoint + user.id, user).then(res => {
    if (res.successful) {
      dispatch({
        type: EDITED_USER,
        user: res.data
      });
    } else {
      dispatch(showErrorMessage(res.errorMessage));
    }
  });
};

const createUser = user => dispatch => {
  UserService.post(endPoint, user).then(res => {
    if (res.successful) {
      dispatch({
        type: CREATED_USER,
        user: res.data
      });
    } else {
      dispatch(showErrorMessage(res.errorMessage));
    }
  });
};

const showErrorMessage = message => {
  return {
    type: ERROR_MESSAGE,
    message: message
  };
};

export const userActions = {
  getUsers,
  editUser,
  createUser
};
