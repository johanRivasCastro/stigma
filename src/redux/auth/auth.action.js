import { AuthService } from "./auth.service";
import { session, setAuthorizationToken } from "../../helpers/";

const endPoint = "login";

const login = credentials => dispatch => {
  AuthService.post(endPoint, credentials).then(response => {
    if (response) {
      const { token } = response;
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
    type: "SET_CURRENT_USER",
    currentUser: user
  };
};

export const loginActions = {
  login,
  setCurrentUser
};
