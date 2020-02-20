import { FETECHED_ALL_USERS, EDITED_USER, CREATED_USER } from "./user.types";

const initialState = {
  users: [],
  usersPagination: {}
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case FETECHED_ALL_USERS: {
      const { totalPages, size, totalElements, content } = action.users;

      return {
        ...state,
        users: content,
        usersPagination: {
          totalPages: totalPages,
          itemsCountPerPage: size,
          totalItemsCount: totalElements
        }
      };
    }
    case EDITED_USER: {
      const index = state.users
        .map(function(e) {
          return e.id;
        })
        .indexOf(action.user.id);
      state.users[index] = action.user;
      return {
        ...state,
        users: [...state.users]
      };
    }
    case CREATED_USER: {
      return {
        ...state,
        users: [...state.users, action.user]
      };
    }
    default: {
      return state;
    }
  }
};
