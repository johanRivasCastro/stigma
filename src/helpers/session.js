import jwtDecode from "jwt-decode";
const saveUser = token => {
  localStorage.setItem("jtoken", token);
  return parseToken(token);
};

const getUser = () => {
  const token = localStorage.getItem("jtoken");
  if (token) {
    return parseToken(token);
  }
  return null;
};

const parseToken = token => {
  const { user, authorities } = jwtDecode(token);
  const tUser = JSON.parse(user);
  const tAuthorities = JSON.parse(authorities);
  tUser.roles = tAuthorities;
  return tUser;
};

export const session = {
  getUser,
  saveUser
};
