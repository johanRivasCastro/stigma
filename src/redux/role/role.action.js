import { roleService } from "./role.service";
const endPoint = "roles/";

const getRoles = () => dispatch => {
  roleService.get(endPoint).then(roles => {
    dispatch({
      type: "FETCHED_ALL_ROLES",
      roles: roles
    });
  });
};

export const roleActions = {
  getRoles
};
