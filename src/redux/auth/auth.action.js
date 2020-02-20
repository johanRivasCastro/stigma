import { AuthService } from "./auth.service";
import { session, setAuthorizationToken } from "../../helpers/";
import { SET_CURRENT_USER, ERROR_MESSAGE } from "./auth.types";

const endPoint = "login";

const login = credentials => dispatch => {
  AuthService.post(endPoint, credentials).then(response => {
    if (response.status !== 200) {
      dispatch(showErrorMessage(response.data.mensaje));
    } else {
      const { token } = response.data;
      const user = session.saveUser(token);
      if (user) {
        dispatch(setCurrentUser(user));
        setAuthorizationToken(token);
      }
    }
  });
};

const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    currentUser: user
  };
};

const showErrorMessage = message => {
  return {
    type: ERROR_MESSAGE,
    message: message
  };
};

export const loginActions = {
  login,
  setCurrentUser
};
