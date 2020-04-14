import jwtDecode from "jwt-decode";
const saveUser = (token) => {
  const user = parseToken(token);
  localStorage.setItem("jtoken", JSON.stringify({ token, user }));
  return user;
};

const editUser = (user) => {
  const token = getToken();
  localStorage.setItem("jtoken", JSON.stringify({ token, user }));
};

const getToken = () => {
  try {
    const { token } = JSON.parse(localStorage.getItem("jtoken"));
    return token;
  } catch (error) {
    return null;
  }
};

const getUser = () => {
  try {
    const { user } = JSON.parse(localStorage.getItem("jtoken"));
    return user;
  } catch (error) {
    return {};
  }
};

const parseToken = (token) => {
  const { user } = jwtDecode(token);
  return JSON.parse(user);
};

export const session = {
  getUser,
  saveUser,
  getToken,
  editUser,
};
