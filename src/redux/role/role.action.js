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

const createRole = role => dispatch => {
  roleService.post(endPoint, role).then(role => {
    if (role) {
      dispatch({
        type: "CREATED_ROLE",
        role: role
      });
    } else {
      dispatch(showErrorMessage("this role allready exist"));
    }
  });
};

const deleteRole = roleID => dispatch => {
  roleService.deleteRole(endPoint, roleID).then(res => {
    if (res) {
      dispatch({
        type: "DELETED_ROLE",
        deleted: roleID
      });
    } else {
      dispatch(showErrorMessage("This role is asigned, it can't be removed"));
    }
  });
};

const showErrorMessage = message => {
  return {
    type: "ERROR_MESSAGE",
    message: message
  };
};

export const roleActions = {
  getRoles,
  createRole,
  deleteRole
};
