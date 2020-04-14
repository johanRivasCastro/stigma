import { AuthService } from "./auth.service";
import { session, setAuthorizationToken } from "../../helpers/";
import { SET_CURRENT_USER } from "./auth.types";
import { ERROR_MESSAGE } from "../alert.types";
import { call } from "../../helpers";

const endPoint = "login";
const patchEndpoint = "users/";

const login = (credentials) => async (dispatch) => {
  try {
    const { token } = await call("post", endPoint, credentials);

    const user = session.saveUser(token);
    if (user) {
      dispatch(setCurrentUser(user));
      setAuthorizationToken(token);
    }
  } catch (error) {
    dispatch(showErrorMessage(error.message));
  }
};

const logOut = () => (dispatch) => {
  localStorage.removeItem("jtoken");
  setAuthorizationToken(false);
  dispatch(setCurrentUser(null));
};

const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    user: user,
  };
};

const showErrorMessage = (message) => {
  return {
    type: ERROR_MESSAGE,
    message: message,
  };
};

export const loginActions = {
  login,
  logOut,
  setCurrentUser,
};
