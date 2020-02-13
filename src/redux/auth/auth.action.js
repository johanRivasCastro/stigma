import { AuthService } from "./auth.service";

const endPoint = "login/";

const login = credentials => {
  return dispatch => {
    AuthService.post(endPoint, credentials).then(response => {
      if (response.token) {
        localStorage.setItem("jtoken", response.token);
        dispatch(setCurrentUser(response.token));
      }
    });
  };
};

const setCurrentUser = token => {
  return {
    type: "LOGIN_SUCCESS",
    token: token
  };
};

export const loginActions = {
  login
};
