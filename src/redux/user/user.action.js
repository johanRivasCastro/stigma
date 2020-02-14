import { UserService } from "./user.service";

const endPoint = "users/";

const getUsers = (page, term = "") => dispatch => {
  UserService.get(
    `${endPoint}?pageNo=${page - 1}&pageSize=${15}&filterBy=${term}`
  ).then(users => {
    dispatch({
      type: "FETECHED_ALL_USERS",
      users: users
    });
  });
};

const editUser = user => {
  return dispatch => {
    UserService.put(endPoint + user.id, user).then(response => {
      dispatch(changeEditedUser(response));
    });
  };
};

const changeEditedUser = (editedUser = []) => {
  return {
    type: "EDITED_USER",
    user: editedUser
  };
};

export const userActions = {
  getUsers,
  editUser
};
