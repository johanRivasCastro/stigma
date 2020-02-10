import { RoleService } from "../services";
const endPoint = "roles/";

const getRoles = () => {
  return dispatch => {
    RoleService.get(endPoint).then(response => {
      dispatch(changeRoleList(response));
    });
  };
};

const changeRoleList = roles => {
  return {
    type: "FETCHED_ALL_ROLES",
    roles: roles
  };
};

export const roleActions = {
  getRoles
};
