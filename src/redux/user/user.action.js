import { UserService } from "./user.service";
import { FETECHED_ALL_USERS, EDITED_USER, CREATED_USER } from "./user.types";

const endPoint = "users/";

const getUsers = (page, term = "") => dispatch => {
  UserService.get(
    `${endPoint}?pageNo=${page - 1}&pageSize=${15}&filterBy=${term}`
  ).then(users => {
    dispatch({
      type: FETECHED_ALL_USERS,
      users: users
    });
  });
};

const editUser = user => dispatch => {
  UserService.put(endPoint + user.id, user).then(user => {
    dispatch({
      type: EDITED_USER,
      user: user
    });
  });
};

const createUser = user => dispatch => {
  UserService.post(endPoint, user).then(user => {
    if (user) {
      dispatch({
        type: CREATED_USER,
        user: user
      });
    }
  });
};

export const userActions = {
  getUsers,
  editUser,
  createUser
};
