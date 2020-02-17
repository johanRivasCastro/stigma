import { RoleService } from "../../services";
const endPoint = "roles/";

const getRoles = () => dispatch => {
  RoleService.get(endPoint).then(roles => {
    dispatch({
      type: "FETCHED_ALL_ROLES",
      roles: roles
    });
  });
};

export const roleActions = {
  getRoles
};
