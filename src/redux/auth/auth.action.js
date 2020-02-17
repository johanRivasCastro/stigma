import { AuthService } from "./auth.service";

const endPoint = "login/";

const login = credentials => dispatch => {
  AuthService.post(endPoint, credentials).then(response => {
    if (response.token) {
      localStorage.setItem("jtoken", response.token);
      dispatch({
        type: "LOGIN_SUCCESS",
        token: response.token
      });
    }
  });
};

export const loginActions = {
  login
};
