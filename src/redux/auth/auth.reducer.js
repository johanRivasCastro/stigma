import { SET_CURRENT_USER } from "./auth.types";

const initialState = {
  loggedIn: false,
  currentUser: null,
};

export const authentication = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER: {
      return {
        ...state,
        loggedIn: action.user ? true : false,
        currentUser: action.user,
      };
    }
    default: {
      return state;
    }
  }
};
