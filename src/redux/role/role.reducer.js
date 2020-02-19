const initialState = {
  roles: []
};

export const role = (state = initialState, action) => {
  switch (action.type) {
    case "FETCHED_ALL_ROLES": {
      return {
        ...state,
        roles: [...action.roles]
      };
    }

    case "CREATED_ROLE": {
      return {
        ...state,
        roles: [...state.roles, action.role]
      };
    }
    case "DELETED_ROLE": {
      const roles = state.roles.filter(role => {
        return role.id !== action.deleted;
      });
      return {
        ...state,
        roles: roles
      };
    }
    default: {
      return state;
    }
  }
};
