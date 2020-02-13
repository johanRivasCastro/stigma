import { UserService } from "./user.service";

const endPoint = "users/";
const getUsers = (page, term = "") => {
  return dispatch => {
    UserService.get(
      `${endPoint}?pageNo=${page - 1}&pageSize=${15}&filterBy=${term}`
    )
      .then(response => {
        dispatch(changeUserList(response));
      })
      .catch(err => console.error(err));
  };
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

const changeUserList = users => {
  return {
    type: "FETECHED_ALL_USERS",
    users: users
  };
};

export const userActions = {
  getUsers,
  editUser
};
